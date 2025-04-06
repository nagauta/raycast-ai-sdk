import { execSync } from 'node:child_process';
import { existsSync, unlinkSync } from 'node:fs';
import { createServer } from 'node:net';
import { randomUUID } from 'node:crypto';

interface AskOptions {
  creativity: 'high' | 'medium' | 'low';
  model: string;
}

interface LaunchContext {
  askPrompt: string;
  askOptions: AskOptions;
  callbackExec: [string, { shell: boolean }];
  socketPath?: string;
}

export const askAI = async (query: string): Promise<string> => {
  // ユニークなソケットパスを生成
  const socketPath = `/tmp/raycast-ai-${randomUUID()}.sock`;

  // 結果を受け取るためのPromise
  let resolveResult: (value: string) => void;
  let rejectResult: (reason: Error) => void;
  const resultPromise = new Promise<string>((resolve, reject) => {
    resolveResult = resolve;
    rejectResult = reject;
  });

  // ソケットサーバーを作成
  const server = createServer((socket) => {
    let data = '';
    socket.on('data', (chunk) => {
      data += chunk.toString();
    });
    socket.on('end', () => {
      resolveResult(data);
      server.close();
    });
    socket.on('error', (err) => {
      rejectResult(new Error(`ソケット通信エラー: ${err.message}`));
    });
  });

  // タイムアウト処理
  const timeout = setTimeout(() => {
    server.close();
    rejectResult(new Error('タイムアウト: レスポンスが受信できませんでした'));
  }, 30000);

  // サーバー起動
  server.listen(socketPath, () => {
    try {
      const launchContext: LaunchContext = {
        askPrompt: query,
        askOptions: {
          creativity: 'high',
          model: 'openai-gpt-4o',
        },
        callbackExec: [`echo "$RAYCAST_PORT_AI_ASK_RESULT" | nc -U ${socketPath}`, { shell: true }],
        socketPath: socketPath,
      };

      const context = encodeURIComponent(JSON.stringify(launchContext));
      execSync(
        `open "raycast://extensions/litomore/raycast-port/ai-ask?launchType=background&context=${context}"`,
      );
    } catch (error) {
      server.close();
      clearTimeout(timeout);
      rejectResult(
        new Error(
          'Raycast拡張機能の起動に失敗しました: ' + (error instanceof Error ? error.message : String(error)),
        ),
      );
    }
  });

  server.on('error', (err) => {
    clearTimeout(timeout);
    rejectResult(new Error(`サーバーエラー: ${err.message}`));
  });

  try {
    const result = await resultPromise;
    clearTimeout(timeout);

    // ソケットファイルのクリーンアップ
    if (existsSync(socketPath)) {
      unlinkSync(socketPath);
    }

    return result;
  } catch (error) {
    // エラー発生時もソケットファイルをクリーンアップ
    if (existsSync(socketPath)) {
      try {
        unlinkSync(socketPath);
      } catch (cleanupError) {
        console.error('ソケットファイル削除中にエラーが発生しました:', cleanupError);
      }
    }
    throw error;
  }
};

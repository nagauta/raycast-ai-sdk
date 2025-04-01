import { execSync } from "node:child_process"
import { readFileSync, existsSync, unlinkSync } from "node:fs"

interface AskOptions {
	creativity: "high" | "medium" | "low"
	model: string
}

interface LaunchContext {
	askPrompt: string
	askOptions: AskOptions
	callbackExec: [string, { shell: boolean }]
}

export const askAI = async (query: string): Promise<string> => {
	const launchContext: LaunchContext = {
		askPrompt: query,
		askOptions: {
			creativity: "high",
			model: "openai-gpt-4o",
		},
		callbackExec: ['echo "$RAYCAST_PORT_AI_ASK_RESULT" > /tmp/raycast_result.txt', { shell: true }],
	}

	const context = encodeURIComponent(JSON.stringify(launchContext))

	const targetFile = "/tmp/raycast_result.txt"
	if (existsSync(targetFile)) {
		unlinkSync(targetFile)
	}
	execSync(`open "raycast://extensions/litomore/raycast-port/ai-ask?launchType=background&context=${context}"`)
	execSync("sleep 0.5")
	const startTime = Date.now()
	const timeout = 30000

	let result: string | null = null
	while (Date.now() - startTime < timeout) {
		if (existsSync(targetFile)) {
			result = readFileSync(targetFile, "utf-8")
			break
		}
		execSync("sleep 0.1")
	}

	if (result) {
		try {
			return result
		} catch (error) {
			throw new Error("ファイル削除中にエラーが発生しました: " + (error instanceof Error ? error.message : String(error)))
		}
	} else {
		throw new Error("タイムアウト: ファイルが見つからないか読み込めませんでした")
	}
}

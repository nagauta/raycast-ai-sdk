import { askAI } from "../src/sdk"

async function main() {
	const defaultPrompt = "who is the ceo of Raycast?"
	const prompt = process.argv[2] || defaultPrompt
	const result = await askAI(prompt)
	console.log(result)
}

main()

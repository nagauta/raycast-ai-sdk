import { askAI } from "../src/sdk"

async function main() {
	const result = await askAI("who is the ceo of Raycast?")
	console.log(result)
}

main()

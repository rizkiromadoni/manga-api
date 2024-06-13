import axios from "axios"
import { JSDOM } from "jsdom"

const getKiryuuChapterUseCase = async (url: string) => {
	const html = await axios.get(url)
	const dom = new JSDOM(html.data).window.document

	const title = dom.querySelector(".headpost h1")?.textContent?.trim() ?? null

	const sources = []
	for (const image of dom.querySelectorAll("#readerarea img")) {
		const src = image?.getAttribute("src") ?? null

		if (src) sources.push(src)
	}

	const result: Chapter = {
		title,
		sources
	}

	return result
}

export default getKiryuuChapterUseCase

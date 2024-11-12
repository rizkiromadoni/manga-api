import { cleanWordpressCDN, formatChapterNumber, sortChapters } from "@/src/lib/helper"
import axios from "axios"
import { JSDOM } from "jsdom"

const getMangasusuSeriesUseCase = async (url: string) => {
	const html = await axios.get(url)
	const dom = new JSDOM(html.data).window.document

	const title =
		dom
			.querySelector("h1.entry-title")
			?.textContent?.trim()
			.replace(" Bahasa Indonesia", "")
			.replace(" Bahasa indonesia", "")
			.replace(" bahasa indonesia", "") ?? null
	const sinopsys =
		dom.querySelector('div[itemprop="description"] p')?.textContent?.trim() ??
		null
	const cover = dom.querySelector(".thumb img")?.getAttribute("src") ?? null
	const alternative =
		dom.querySelector(".seriestualt")?.textContent?.trim() ?? null
	const score =
		dom.querySelector('div[itemprop="ratingValue"]')?.textContent?.trim() ??
		null

	const tables = dom.querySelectorAll(".infotable tbody tr")
	let [type, status, published, author, artist] = Array(5).fill(null)
	for (const table of tables) {
		const innerText = table.textContent
		if (innerText?.includes("Type")) {
			type = innerText.replace("Type", "").trim()
		}
		if (innerText?.includes("Status")) {
			status = innerText.replace("Status", "").trim()
		}
		if (innerText?.includes("Released")) {
			published = innerText.replace("Released", "").trim()
		}
		if (innerText?.includes("Author")) {
			author = innerText.replace("Author", "").trim()
		}
		if (innerText?.includes("Artist")) {
			artist = innerText.replace("Artist", "").trim()
		}
	}

	const genreElements = dom.querySelectorAll(".seriestugenre a")
	const genres: string[] = []

	for (const genre of genreElements) {
		const text = genre?.textContent?.trim()

		if (typeof text === "string") {
			genres.push(text)
		}
	}

	const chapters: {
		chapter: string
		url: string
	}[] = []

	for (const chapter of dom.querySelectorAll("#chapterlist ul li")) {
		const innerText =
			chapter
				.querySelector("a .chapternum")
				?.textContent?.replace("Chapter ", "") ?? null

		if (typeof innerText === "string") {
			chapters.push({
				chapter: formatChapterNumber(
					innerText.toLocaleLowerCase().replace("chapter ", "").trim()
				),
				url: chapter.querySelector("a")?.getAttribute("href") ?? ""
			})
		}
	}

	const sortedChapters = sortChapters(chapters)

	const result: Series = {
		title,
		sinopsys,
		cover: cover ? cleanWordpressCDN(cover) : null,
		score,
		alternative,
		type,
		status,
		author,
		artist,
		published,
		genres,
		chapters: sortedChapters
	}

	return result
}

export default getMangasusuSeriesUseCase
import axios from "axios"
import { JSDOM } from "jsdom"
import { MANGASUSU_URL } from "../../lib/variables"

const getMangasusuFeedUseCase  = async () => {
    const html = await axios.get(MANGASUSU_URL)
    const dom = new JSDOM(html.data).window.document

    const upd = dom.querySelectorAll(".listupd")[1]
    const mangas = upd.querySelectorAll(".stylesven a.series")

    const results: Feed[] = []
    for (const manga of mangas) {
        const title = manga.getAttribute("title")

        if (typeof title === "string") {
            results.push({
                title: title
                    .replace(" Bahasa Indonesia", "")
                    .replace(" Bahasa indonesia", "")
                    .replace(" bahasa indonesia", ""),
                url: manga.getAttribute("href")
            })
        }
    }

    return results
}

export default getMangasusuFeedUseCase
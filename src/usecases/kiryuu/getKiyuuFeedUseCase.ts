import axios from "axios"
import { JSDOM } from "jsdom"
import { KIRYUU_URL } from "../../lib/variables"

const getKiryuuFeedUseCase  = async () => {
    const html = await axios.get(KIRYUU_URL)
    const dom = new JSDOM(html.data).window.document

    const upd = dom.querySelectorAll(".listupd")[2]
    const mangas = upd.querySelectorAll(".utao .imgu a.series")

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

export default getKiryuuFeedUseCase
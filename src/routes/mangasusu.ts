import { Hono } from "hono";
import { HTTPException } from 'hono/http-exception'
import getMangasusuFeedUseCase from "../usecases/mangasusu/getMangasusuFeedUseCase";
import getMangasusuSeriesUseCase from "../usecases/mangasusu/getMangasusuSeriesUseCase";
import getMangasusuChapterUseCase from "../usecases/mangasusu/getMangasusuChapterUseCase";

const mangasusu = new Hono()

mangasusu.get("/feed", async (c) => {
    const json = await getMangasusuFeedUseCase()
    return c.json(json)
})

mangasusu.get("/series", async (c) => {
    const url = c.req.query("url")
    if (!url) throw new HTTPException(400, {
        message: "url is required"
    })

    const json = await getMangasusuSeriesUseCase(url)
    return c.json(json)
})

mangasusu.get("/chapter", async (c) => {
    const url = c.req.query("url")
    if (!url) throw new HTTPException(400, {
        message: "url is required"
    })

    const json = await getMangasusuChapterUseCase(url)
    return c.json(json)
})

export default mangasusu
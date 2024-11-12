import { Hono } from "hono";
import { HTTPException } from 'hono/http-exception'
import getKiryuuFeedUseCase from "../usecases/kiryuu/getKiryuuFeedUseCase";
import getKiryuuSeriesUseCase from "../usecases/kiryuu/getKiryuuSeriesUseCase";
import getKiryuuChapterUseCase from "../usecases/kiryuu/getKiryuuChapterUseCase";

const kiryuu = new Hono()

kiryuu.get("/feed", async (c) => {
    const json = await getKiryuuFeedUseCase()
    return c.json(json)
})

kiryuu.get("/series", async (c) => {
    const url = c.req.query("url")
    if (!url) throw new HTTPException(400, {
        message: "url is required"
    })

    const json = await getKiryuuSeriesUseCase(url)
    return c.json(json)
})

kiryuu.get("/chapter", async (c) => {
    const url = c.req.query("url")
    if (!url) throw new HTTPException(400, {
        message: "url is required"
    })

    const json = await getKiryuuChapterUseCase(url)
    return c.json(json)
})

export default kiryuu
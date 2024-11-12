import getMangasusuChapterUseCase from "./getMangasusuChapterUseCase";
import getMangasusuFeedUseCase from "./getMangasusuFeedUseCase";
import getMangasusuSeriesUseCase from "./getMangasusuSeriesUseCase";

// const data = await getMangasusuFeedUseCase()
// console.log(data)

// const data = await getMangasusuSeriesUseCase("https://mangasusuku.com/komik/the-lustful-demon-is-the-king-of-demons/")
// console.log(data)

const data = await getMangasusuChapterUseCase("https://mangasusuku.com/the-lustful-demon-is-the-king-of-demons-chapter-39/")
console.log(data)
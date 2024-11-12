# Indonesian Comics Scraper API

An Indonesian Comics Scraper API built with [Bun](https://bun.sh/) and TypeScript. This API scrapes comic data from Indonesian comic websites, specifically **Kiryuu** and **Mangasusu**. It extracts details such as the latest comic updates, manga information, chapter details, and image URLs.

## Features

- **Latest Comic Updates**: Fetch the latest comic updates (feeds) from supported websites.
- **Manga Details**: Retrieve comprehensive manga details, including the title, author, genre, and more.
- **Chapter Details**: Access chapter details, including image URLs for each page.

## Supported Websites

- [Kiryuu](https://kiryuu.org/)
- [Mangasusu](#)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rizkiromadoni/manga-api.git
3. **Install dependencies**:
   ```bash
   cd manga-api
   bun install
4. **Run server**:
   ```bash
   bun run dev

## Usage

All routes are accessible via `GET` requests. Replace `<website_name>` with either `kiryuu` or `mangasusu`.

- **Get Latest Feed**: /<website_name>/feed
- **Get Series Details**: /<website_name>/series?url=<series_url>
- **Get Chapter Details**: /<website_name>/chapter?url=<chapter_url>

## Built With

- [Bun](https://bun.sh) - Fast all-in-one JavaScript runtime
- [TypeScript](https://www.typescriptlang.org) - Typed JavaScript for scalable, maintainable code

## Future Improvements

- Support for additional comic websites
- Error handling and response formatting improvements
    Enhanced scraping efficiency and optimization

declare type Feed = {
	title: string | null
	url: string | null
}

declare type Series = {
	title: string | null
	sinopsys: string | null
	cover: string | null
	score: string | null
	alternative: string | null
	type: string | null
	status: string | null
	author: string | null
	artist: string | null
	published: string | null
	genres: string[] | []
	chapters: { chapter: string | null; url: string | null }[] | []
}

declare type Chapter = {
	title: string | null
	sources: string[]
}

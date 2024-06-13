export const cleanWordpressCDN = (text: string): string => {
	return text
		.replace(new RegExp("i0.wp.com/"), "")
		.replace(new RegExp("i1.wp.com/"), "")
		.replace(new RegExp("i2.wp.com/"), "")
		.replace(new RegExp("i3.wp.com/"), "")
}

export const formatChapterNumber = (text: string): string => {
	if (text === "0" || text === "00") return "0"
	if (text.includes("0.")) return text
	return text.replace(/^0+/, "")
}

export const sortChapters = (data: { chapter: string; url: string }[]) => {
	return data.sort((a, b) => {
		const numA = Number.parseFloat(a.chapter)
		const numB = Number.parseFloat(b.chapter)

		if (Number.isNaN(numA) && Number.isNaN(numB)) {
			return a.chapter.localeCompare(b.chapter)
		}

		if (Number.isNaN(numA)) return 1

		if (Number.isNaN(numB)) return -1

		return numA - numB
	})
}

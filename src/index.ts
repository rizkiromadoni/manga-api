import { Hono } from "hono"
import kiryuu from "./routes/kiryuu"
import { AxiosError } from "axios"
import { HTTPException } from "hono/http-exception"
import { bearerAuth } from "hono/bearer-auth"
import mangasusu from "./routes/mangasusu"

const app = new Hono()

app.onError((err, c) => {
	if (err instanceof AxiosError) {
		return c.json({
			message: "Fetch Error",
		}, 400)
	}

	if (err instanceof HTTPException) {
		if (err.status === 401) {
			return c.json({
				message: "Unauthorized"
			}, 401)
		}

		return c.json({
			message: err.message
		}, err.status)
	}

	return c.json({
		message: "Internal Server Error"
	}, 500)
})

app.get("/", (c) => {
	return c.json({ message: "Hello World" })
})

app.use('*', bearerAuth({ token: Bun.env.API_KEY || "token" }))

app.route("/kiryuu", kiryuu)
app.route("/mangasusu", mangasusu)

export default {
	fetch: app.fetch,
	port: Bun.env.PORT
}

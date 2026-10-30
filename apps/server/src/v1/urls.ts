import { Hono } from "hono";
import { database, urls } from "../database";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

const app = new Hono();

app.get("/:id", async (c) => {
    const id = c.req.param("id");

    const url = await database.select().from(urls).where(eq(urls.id, id));
    if (url.length === 0) {
        return c.json({ message: "no such url" }, 404);
    }

    return c.redirect(url[0].destination, 302);
});

app.get("/d/:id", async (c) => {
    const id = c.req.param("id");

    const url = await database.select().from(urls).where(eq(urls.id, id));
    if (url.length === 0) {
        return c.json({ message: "no such url" }, 404);
    }

    return c.json(url[0], 200);
});

app.post("/", async (c) => {
    const body = await c.req.json(); // todo: use zod [?]

    if (body.destination === undefined) {
        return c.json({ message: "no destination provided" }, 400);
    }

    try {
        new URL(body.destination);
    } catch {
        return c.json({ message: "invalid destination" }, 400);
    }
    const expires = body.expires_at;
    const len = expires && expires < 86400 ? 5 : 7;

    const url = await database
        .insert(urls)
        .values({ id: nanoid(len), destination: body.destination })
        .returning();
    if (url.length === 0) {
        return c.json({ message: "my bad" }, 500);
    }

    return c.json(url[0]);
});

export default app;

import { Hono } from "hono";
import { database, urls } from "../database";
import { and, eq } from "drizzle-orm";
import { middleware, Variables } from "./middleware";
import { nanoid } from "nanoid";

const app = new Hono<{ Variables: Variables }>();

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

app.post("/", middleware, async (c) => {
    const user = c.get("jwtPayload");
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
        .values({ id: nanoid(len), destination: body.destination, creator_id: user.id })
        .returning();
    if (url.length === 0) {
        return c.json({ message: "my bad" }, 500);
    }

    return c.json(url[0]);
});

app.delete("/:id", middleware, async (c) => {
    const user = c.get("jwtPayload");
    const id = c.req.param("id");

    const url = await database
        .delete(urls)
        .where(and(eq(urls.creator_id, user.id), eq(urls.id, id)))
        .returning();
    if (url.length === 0) {
        return c.json({ message: "no such url" }, 400);
    }

    return c.status(200);
});

export default app;

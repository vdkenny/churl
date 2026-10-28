import { Hono } from "hono";
import { middleware, Variables } from "./middleware";
import { database, users } from "../database";
import { eq } from "drizzle-orm";

const app = new Hono<{ Variables: Variables }>();

app.get("/@me", middleware, async (c) => {
    const payload = c.get("jwtPayload");

    const user = await database.select().from(users).where(eq(users.id, payload.id));
    if (user.length === 0) {
        return c.json({ message: "no user found" }, 401);
    }

    return c.json(user[0]);
});

export default app;

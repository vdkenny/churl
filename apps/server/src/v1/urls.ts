import { Hono } from "hono";

const app = new Hono();

app.get("/:id", async (c) => {
    const id = c.req.param("id");
});

export default app;

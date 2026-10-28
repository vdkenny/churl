import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import v1 from "./v1";

const app = new Hono();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);
app.use(csrf());

app.get("/ping", async (c) => c.json({ status: "pong" }));
app.route("/v1", v1);

export default app;

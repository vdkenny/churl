import { Hono } from "hono";
import urls from "./urls";

const app = new Hono();

app.route("/urls", urls);

export default app;

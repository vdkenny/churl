import { Hono } from "hono";
import authorization from "./authorization";
import urls from "./urls";

const app = new Hono();

app.route("/authorization", authorization);
app.route("/urls", urls);

export default app;

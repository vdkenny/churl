import { Hono } from "hono";
import authorization from "./authorization";

const app = new Hono();

app.route("/authorization", authorization);

export default app;

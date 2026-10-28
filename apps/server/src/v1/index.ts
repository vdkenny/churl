import { Hono } from "hono";
import authorization from "./authorization";
import users from "./users";
import urls from "./urls";

const app = new Hono();

app.route("/authorization", authorization);
app.route("/users", users);
app.route("/urls", urls);

export default app;

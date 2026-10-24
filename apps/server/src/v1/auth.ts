import { Hono } from "hono";
// import { decode, sign, verify } from "hono/jwt";
import { setCookie, getCookie } from "hono/cookie";

const GITHUB_AUTHORIZATION_URL = "https://github.com/login/oauth/authorize";

const app = new Hono();

app.get("/init", async (c) => {
    const url = new URL(GITHUB_AUTHORIZATION_URL);
    const state = crypto.randomUUID();

    url.searchParams.set("client_id", Bun.env.GITHUB_CLIENT_ID);
    url.searchParams.set("redirect_uri", Bun.env.GITHUB_REDIRECT_URI);
    url.searchParams.set("state", state);

    setCookie(c, "state", state, {
        // secure: Bun.env.NODE_ENV === "production",
        // domain: "churl.dev",
        httpOnly: true,
        maxAge: 3600,
        sameSite: "strict",
    });

    return c.redirect(url);
});

app.get("/complete", async (c) => {
    const state = c.req.param("state");

    if (state !== getCookie(c, "state")) {
        return c.json({ message: "invalid state" }, 400);
    }
});

export default app;

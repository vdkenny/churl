import { Hono } from "hono";
import { sign } from "hono/jwt";
import { setCookie, getCookie } from "hono/cookie";
import { database, users } from "../database";
import { eq } from "drizzle-orm";

const GITHUB_AUTHORIZATION_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USER_API = "https://api.github.com/user";

const app = new Hono();

app.get("/init", async (c) => {
    const url = new URL(GITHUB_AUTHORIZATION_URL);
    const state = crypto.randomUUID();

    url.searchParams.set("client_id", Bun.env.GITHUB_CLIENT_ID);
    url.searchParams.set("redirect_uri", Bun.env.GITHUB_REDIRECT_URI);
    url.searchParams.set("state", state);

    setCookie(c, "state", state, {
        secure: Bun.env.NODE_ENV === "production",
        domain: "localhost",
        httpOnly: true,
        maxAge: 3600,
        sameSite: "strict",
    });

    await Bun.sleep(1000);

    return c.redirect(url, 302);
});

app.get("/complete", async (c) => {
    const state = c.req.query("state");

    if (state !== getCookie(c, "state")) {
        return c.json({ message: "invalid state" }, 400);
    }

    const url = new URL(GITHUB_TOKEN_URL);
    const code = c.req.query("code");

    if (!code) {
        return c.json({ message: "invalid code" }, 400);
    }

    url.searchParams.set("client_id", Bun.env.GITHUB_CLIENT_ID);
    url.searchParams.set("client_secret", Bun.env.GITHUB_CLIENT_SECRET);
    url.searchParams.set("redirect_uri", Bun.env.GITHUB_REDIRECT_URI);
    url.searchParams.set("code", code);

    let response = await fetch(url, {
        method: "POST",
        headers: { Accept: "application/json" },
    });
    let json = await response.json();

    if (json.error) {
        return c.json({ message: "oauth error" }, 400);
    }

    response = await fetch(GITHUB_USER_API, {
        headers: {
            Authorization: "Bearer " + json.access_token,
        },
    });

    if (!response.ok) {
        return c.json({ message: "api error" }, 400);
    }
    json = await response.json();

    const user = await database.select().from(users).where(eq(users.email, json.email));
    if (user.length === 0) {
        await database.insert(users).values({ email: json.email, github_id: json.id });
    }

    const jwtToken = await sign({ id: user[0].id }, Bun.env.JWT_SECRET);
    console.log("jwt:", jwtToken);
    setCookie(c, "sid", jwtToken, {
        secure: Bun.env.NODE_ENV === "production",
        domain: "localhost",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 31,
        sameSite: "strict",
    });

    return c.redirect(Bun.env.HOME_URL, 302);
});

export default app;

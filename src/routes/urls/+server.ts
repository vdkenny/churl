import { error } from "@sveltejs/kit";
import { checkRateLimit } from "@vercel/firewall";
import { nanoid } from "nanoid";
import * as z from "zod";
import { database, urls } from "#lib/server/database/index.ts";
import type { RequestHandler } from "./$types";

const schema = z.object({
    destination: z.httpUrl(),
    expires_at: z.iso.datetime().optional(),
});

export const POST: RequestHandler = async ({ request }) => {
    const { rateLimited } = await checkRateLimit("create_url", { request });
    if (rateLimited) error(429);

    let body;
    try {
        body = await request.json();
        schema.parse(body);
    } catch {
        error(400);
    }

    const [url] = await database
        .insert(urls)
        .values({ id: nanoid(6), destination: body.destination, expires_at: body.expires_at })
        .returning();
    if (!url) error(500);

    return Response.json(url);
};

import { error, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { database, urls } from "#lib/server/database/index.ts";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
    const [url] = await database.select().from(urls).where(eq(urls.id, params.id)).limit(1);

    if (!url) error(404);
    if (url.expires_at && url.expires_at < new Date()) {
        await database.delete(urls).where(eq(urls.id, url.id));
        error(404);
    }

    redirect(302, url.destination, { external: true });
};

import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { database, urls } from "#lib/server/database/index.ts";
import { eq } from "drizzle-orm";

export const GET: RequestHandler = async ({ params }) => {
    const url = await database.select().from(urls).where(eq(urls.id, params.id));
    if (url.length === 0) {
        return error(404);
    }

    return redirect(302, url[0].destination, {external: true});
};

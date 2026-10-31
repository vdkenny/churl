import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { database, urls } from "#lib/server/database/index.ts";
import { nanoid } from "nanoid";

export const POST: RequestHandler = async ({ request }) => {
    const { destination } = await request.json();

    if (!destination) {
        return error(400);
    }

    const url = await database
        .insert(urls)
        .values({ id: nanoid(6), destination })
        .returning();
    if (url.length === 0) {
        return error(500);
    }

    return Response.json(url[0]);
};

import { command } from "$app/server";
import { API_URL, VERCEL_SERVER_URL } from "$app/env/private";
import * as v from "valibot";
import { error } from "@sveltejs/kit";

export const create = command(v.pipe(v.string(), v.nonEmpty(), v.url()), async (destination) => {
    const response = await fetch(`${VERCEL_SERVER_URL}/v1/urls`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ destination }),
    });

    if (!response.ok) {
        return error(response.status, response.statusText);
    }

    const json = await response.json();

    return `${API_URL.replace(/^https?:\/\//, "")}/v1/urls/${json.id}`;
});

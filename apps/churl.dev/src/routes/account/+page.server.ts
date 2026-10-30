import type { PageServerLoad } from "./$types";
import { API_URL } from "$app/env/private";

export const load: PageServerLoad = async ({ request }) => {
    const response = await fetch(`${API_URL}/v1/users/@me`, {
        headers: {
            Cookie: request.headers.get("Cookie") ?? "",
        },
    });

    if (response.ok) {
        return await response.json();
    }

    return null;
};

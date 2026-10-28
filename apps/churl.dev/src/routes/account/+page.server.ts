import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ request }) => {
    const response = await fetch("http://localhost:3000/v1/users/@me", {
        headers: {
            Cookie: request.headers.get("Cookie") ?? "",
        },
    });

    if (response.ok) {
        return await response.json();
    }

    return null;
};

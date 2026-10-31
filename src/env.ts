import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
    VERCEL_URL: { public: true },
    DATABASE_URL: {},
});

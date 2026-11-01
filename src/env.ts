import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
    VERCEL_PROJECT_PRODUCTION_URL: { public: true },
    DATABASE_URL: {},
});

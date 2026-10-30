import { defineEnvVars } from "@sveltejs/kit/env";
import * as v from "valibot";

export const variables = defineEnvVars({
    VERCEL_SERVER_URL: { schema: v.optional(v.string()) },
    API_URL: { schema: v.optional(v.string()) },
});

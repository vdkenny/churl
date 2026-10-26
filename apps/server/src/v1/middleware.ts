import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";

export type Variables = JwtVariables<{ id: number }>;
export const middleware = jwt({ secret: Bun.env.JWT_SECRET, alg: "HS256", cookie: "sid" });

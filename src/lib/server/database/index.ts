import { DATABASE_URL } from "$app/env/private";
import { drizzle } from "drizzle-orm/bun-sql";

export const database = drizzle(DATABASE_URL);
export * from "./schema";

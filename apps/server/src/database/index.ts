import { drizzle } from "drizzle-orm/bun-sql";
import { relations } from "./schema";

export const database = drizzle(process.env.DATABASE_URL, { relations });

export * from "./schema";

import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const urls = pgTable("urls", {
    id: varchar().primaryKey(),
    destination: varchar().notNull(),

    expires_at: timestamp({ mode: "date", withTimezone: true }),
    created_at: timestamp({ mode: "date", withTimezone: true }).defaultNow(),
});

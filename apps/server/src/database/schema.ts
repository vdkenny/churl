// todo: move schema to packages/xxx to share between back-end and front-end [?]
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const urls = pgTable("urls", {
    id: varchar().primaryKey(),
    destination: varchar().notNull(),

    expires_at: timestamp({ mode: "date", withTimezone: true }),
});

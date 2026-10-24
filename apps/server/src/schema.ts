// todo: move schema to packages/xxx to share between back-end and front-end [?]
import { defineRelations } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar().notNull(),

    github_id: integer(),
});

export const urls = pgTable("urls", {
    id: varchar().primaryKey(),
    expires_at: timestamp({ mode: "date", withTimezone: true }),

    creator_id: integer(),
});

const relations = defineRelations({ users, urls }, ({ one, users, urls }) => ({
    urls: {
        creator: one.users({
            from: urls.creator_id,
            to: users.id,
        }),
    },
}));

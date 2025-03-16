import { randomUUID } from "crypto";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const artists = sqliteTable("artists", {
    id: text("id").primaryKey().$defaultFn(() => randomUUID()),
    name: text("name").notNull(),
    bio: text("bio"),
    genre: text("genre").notNull()
});

export const releases = sqliteTable("releases", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    release_date: text("release_date"),
    release_status: text("release_status").notNull(),
    artist_id: text("artist_id").notNull().references(() => artists.id)
});
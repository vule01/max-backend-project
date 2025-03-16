import { drizzle } from "drizzle-orm/d1";
import { D1Database } from "@cloudflare/workers-types";
import { env } from "cloudflare:workers";
import { artists, releases } from "./schema";

export const db = drizzle(env.DB as D1Database, {
  schema: { artists, releases }
});

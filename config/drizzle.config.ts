import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dbCredentials: {
    url: "file:./src/db/database.db"
  }
});

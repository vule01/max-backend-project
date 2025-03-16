import { Hono } from "hono";
import { db } from './db'
import { artists, releases } from "./db/schema";
import { HTTPException } from "hono/http-exception";

const app = new Hono<{ Bindings: Env }>();
type ArtistInsert = typeof artists.$inferInsert;
type ArtistSelect = typeof artists.$inferInsert;
type ReleaseInsert = typeof releases.$inferInsert;
type ReleaseSelect = typeof releases.$inferSelect;

app.post("/artists", async (c) => {
  try {
    const reqBody: ArtistInsert = await c.req.json();
    if(!isArtist(reqBody)) {
      console.error(`Invalid fields for creating an artist: ${JSON.stringify(reqBody)}`);  
      throw new HTTPException(400, { message: 'Invalid Request Body'});
    }

    const inserted: ArtistSelect = (await db.insert(artists).values(reqBody).returning())[0];
    return c.json(inserted);
  } catch (err) {
    console.error(err);
    throw new HTTPException(500, { message: 'Internal Server Error'});
  }
});

app.get("/artists", async (c) => {
  const artistList: ArtistSelect[] = await db.select().from(artists);
  return c.json(artistList);
})

function isArtist(data: any): data is ArtistInsert {
  return (
    typeof data.name === 'string' &&
    (data.bio === undefined || typeof data.bio === 'string') &&
    typeof data.genre === 'string'
  );
}

export default app;
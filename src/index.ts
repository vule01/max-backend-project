import { Hono } from "hono";
import { db } from './db'
import { artists, releases } from "./db/schema";
import { HTTPException } from "hono/http-exception";
import { ArtistInsert, ArtistSelect, isArtist, isRelease, ReleaseInsert, ReleaseSelect } from "./utils/validate";
import { eq, and, sql } from "drizzle-orm";

const app = new Hono<{ Bindings: Env }>();

app.post("/artists", async (c) => {
  const reqBody: ArtistInsert = await c.req.json();
  if(!isArtist(reqBody)) {
    console.error(`Invalid fields for creating an artist: ${JSON.stringify(reqBody)}`);  
    throw new HTTPException(400, { message: 'Invalid Request Body'});
  }

  try {
    const inserted: ArtistSelect = (await db.insert(artists).values(reqBody).returning())[0];
    return c.json(inserted);
  } catch (err) {
    console.error(err);
    throw new HTTPException(500, { message: 'Internal Server Error'});
  }
});

app.get("/artists", async (c) => {
  const genreQuery = c.req.query('genre');
  const nameQuery = c.req.query('name');
  const conditions = [];

  if (genreQuery) {
    conditions.push(
      eq(
        sql`lower(${artists.genre})`,
        sql`lower(${genreQuery})`
      )
    );
  }
  if (nameQuery) {
    conditions.push(
      eq(
        sql`lower(${artists.name})`,
        sql`lower(${nameQuery})`
      )
    );
  }

  const artistList: ArtistSelect[] = await db.select()
    .from(artists)
    .where(conditions.length > 0 ? and(...conditions) : undefined);
  return c.json(artistList);
})

app.post("/releases", async (c) => {
  const reqBody: ReleaseInsert = await c.req.json();
  if(!isRelease(reqBody)) {
    console.error(`Invalid fields for creating a release: ${JSON.stringify(reqBody)}`);
    throw new HTTPException(400, { message: 'Invalid Request Body'});
  }

  try {
    const inserted: ReleaseSelect = (await db.insert(releases).values(reqBody).returning())[0];
    return c.json(inserted);
  } catch (err) {
    console.error(err);
    throw new HTTPException(500, { message: 'Internal Server Error'});
  }
});

app.get("/releases", async (c) => {
  const artistIdQuery = c.req.query('artist_id');
  const genreQuery = c.req.query('genre');
  const statusQuery = c.req.query('status');
  const conditions = [];

  if(artistIdQuery) {
    conditions.push(eq(releases.artist_id, artistIdQuery));
  }
  if (genreQuery) {
    conditions.push(
      eq(
        sql`lower(${releases.genre})`,
        sql`lower(${genreQuery})`
      )
    );
  }
  if (statusQuery) {
    conditions.push(
      eq(
        sql`lower(${releases.status})`,
        sql`lower(${statusQuery})`
      )
    );
  }

  const releaseList: ReleaseSelect[] = await db
    .select({
      id: releases.id,
      title: releases.title,
      status: releases.status,
      artist_id: releases.artist_id})
    .from(releases)
    .where(conditions.length > 0 ? and(...conditions) : undefined);
  return c.json(releaseList);
})

export default app;
import { artists, releases } from "../db/schema";
import { db } from '../db'
import { eq } from 'drizzle-orm';

export type ArtistInsert = typeof artists.$inferInsert;
export type ArtistSelect = typeof artists.$inferInsert;
export type ReleaseInsert = typeof releases.$inferInsert;
export type ReleaseSelect = {
    id: string,
    title: string,
    status: string,
    artist_id: string
};

export function isArtist(data: any): data is ArtistInsert {
    return (
      typeof data.name === 'string' &&
      (data.bio === undefined || typeof data.bio === 'string') &&
      typeof data.genre === 'string'
    );
}
  
export async function isRelease(data: any): Promise<boolean> {
    const validArtist: ArtistSelect[] = await db.select().from(artists).where(eq(artists.id, data.artist_id));
    return (
        validArtist.length > 0 &&
        typeof data.title === 'string' &&
        typeof data.release_date === 'string' &&
        typeof data.status === 'string' &&
        typeof data.genre === 'string' &&
        typeof data.artist_id === 'string'
    );
}
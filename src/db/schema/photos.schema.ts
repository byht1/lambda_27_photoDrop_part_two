import { InferModel } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const photos = pgTable('photos', {
  id: uuid('id').defaultRandom().primaryKey(),
  albumId: uuid('album_id').notNull(),
  name: varchar('first_name', { length: 50 }).notNull(),
  people: varchar('people').array().default([]),
  url: varchar('url').notNull(),
  originalUrl: varchar('original_url').notNull(),
});

export type TPhotos = InferModel<typeof photos>;

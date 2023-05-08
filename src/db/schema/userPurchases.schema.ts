//user_purchases

import { InferModel } from 'drizzle-orm';
import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { photos } from './photos.schema';
import { users } from './user.schema';

export const userPurchases = pgTable(
  'user_purchases',
  {
    photoId: uuid('photo_id')
      .notNull()
      .references(() => photos.id),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
  },
  (table) => ({
    id: primaryKey(table.photoId, table.userId),
  })
);

export type TUserPurchases = InferModel<typeof userPurchases>;
export type TNewUserPurchases = InferModel<typeof userPurchases, 'insert'>;

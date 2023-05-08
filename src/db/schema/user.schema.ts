import { InferModel } from 'drizzle-orm';
import { pgTable, varchar, uuid, uniqueIndex, integer } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    phone: varchar('phone', { length: 15 }).notNull(),
    token: varchar('token'),
    verificationCode: integer('verification_code'),
    numberVerification: integer('number_verification').default(0),
  },
  (table) => ({
    phoneIndex: uniqueIndex('phoneIdx').on(table.phone),
  })
);

export type TUsers = InferModel<typeof users>;
export type TNewUsers = InferModel<typeof users, 'insert'>;

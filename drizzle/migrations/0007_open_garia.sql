ALTER TABLE "users" ADD COLUMN "avatar" varchar;
ALTER TABLE "users" DROP COLUMN IF EXISTS "avatar1";
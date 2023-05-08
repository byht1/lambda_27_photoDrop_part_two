CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"phone" varchar(15) NOT NULL,
	"token" varchar,
	"verification_code" integer,
	"number_verification" integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "user_purchases" (
	"photo_id" uuid NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_purchases" ADD CONSTRAINT "user_purchases_photo_id_user_id" PRIMARY KEY("photo_id","user_id");

DO $$ BEGIN
 ALTER TABLE "user_purchases" ADD CONSTRAINT "user_purchases_photo_id_photos_id_fk" FOREIGN KEY ("photo_id") REFERENCES "photos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "user_purchases" ADD CONSTRAINT "user_purchases_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "phoneIdx" ON "users" ("phone");
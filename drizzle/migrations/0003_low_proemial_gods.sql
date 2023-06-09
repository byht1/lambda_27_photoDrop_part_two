

CREATE TABLE IF NOT EXISTS "users_selfie" (
	"user_id" uuid NOT NULL,
	"url" varchar NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "users_selfie" ADD CONSTRAINT "users_selfie_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
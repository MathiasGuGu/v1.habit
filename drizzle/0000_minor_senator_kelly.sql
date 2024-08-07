CREATE TABLE IF NOT EXISTS "habitfarm_habitday" (
	"id" serial PRIMARY KEY NOT NULL,
	"habitboard_id" varchar(256),
	"day" varchar(256),
	"completed" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "habitfarm_habitboard" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"description" varchar(256),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "habitfarm_habitday" ADD CONSTRAINT "habitfarm_habitday_habitboard_id_habitfarm_habitboard_id_fk" FOREIGN KEY ("habitboard_id") REFERENCES "public"."habitfarm_habitboard"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

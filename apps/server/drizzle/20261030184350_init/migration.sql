CREATE TABLE "urls" (
	"id" varchar PRIMARY KEY,
	"destination" varchar NOT NULL,
	"creator_id" integer NOT NULL,
	"expires_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar NOT NULL,
	"github_id" integer,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE "urls" (
	"id" varchar PRIMARY KEY,
	"destination" varchar NOT NULL,
	"expires_at" timestamp with time zone
);

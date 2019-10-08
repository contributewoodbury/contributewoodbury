
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!


--DATABASE NAME "woodbury"

CREATE TABLE "categories" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50)
);

CREATE TABLE "nonprofit" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100),
    "password" VARCHAR(250),
    "contact_email" VARCHAR(150),
    "address" VARCHAR(150),
    "city" VARCHAR(50),
    "state" VARCHAR(25),
    "zip_code" INT,
    "website" VARCHAR(400),
    "description" VARCHAR,
    "logo" VARCHAR(400),
    "is_approved" BOOLEAN DEFAULT false,
    "category_id" INT REFERENCES "categories",
    "last_confirmed" DATE
);

CREATE TABLE "event" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50),
    "non_profit_id" INT REFERENCES "nonprofit",
    "description" VARCHAR(500),
    "address" VARCHAR(150),
    "city" VARCHAR(50),
    "state" VARCHAR(25),
    "zip_code" INT,
    "start_date" DATE,
    "end_date" DATE,
    "event_url" VARCHAR(400),
);

CREATE TABLE "role" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50),
    "description" VARCHAR(150),
    "number_needed" INT,
    "start_time" TIME,
    "end_time" TIME,
    "date" DATE,
    "event_id" INT REFERENCES "event" 
);

CREATE TABLE "volunteer_role" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80),
    "role_id" INT REFERENCES "role",
    "start_time" TIME,
    "end_time" TIME,
    "comments" VARCHAR(350),
    "email" VARCHAR(150),
    "phone_number" VARCHAR(15),
    "address" VARCHAR(150),
    "city" VARCHAR(50),
    "state" VARCHAR(25),
    "zip_code" INT
);


INSERT INTO "categories" ("name") VALUES ('test');

INSERT INTO "nonprofit" ("name", "password", "contact-email", "address", "city", "zip_code", "website", "logo", "last_confirmed", "category_id") VALUES('test', 'test', 'test', 'test', 'test', 1, 'test', 'test', '1/1/1', 1);

INSERT INTO "event" ("name", "description", "address", "city", "zip_code", "start_date", "end_date", "event_url", "non_profit_id") VALUES ('test', 'test', 'test', 'test', 1, '1/1/1', '1/1/1', 'test', 1);

INSERT INTO "role" ("name", "description", "number_needed", "start_time", "end_time", "date", "event_id") VALUES ('test', 'test', 1, '1:30', '2:00', '10/10/10', 1);

INSERT INTO "volunteer_role" ("name", "role_id", "start_time", "end_time", "comments", "email", "phone_number", "address", "city", "zip_code") VALUES ('test', 1, '1:30', '2:00', 'test', 'test', 1, 'test', 'test', 1);


-- for cascade delete
ALTER TABLE "public"."event"
  DROP CONSTRAINT "event_non_profit_id_fkey",
  ADD CONSTRAINT "event_non_profit_id_fkey" FOREIGN KEY ("non_profit_id") REFERENCES "public"."nonprofit"("id") ON DELETE CASCADE;

ALTER TABLE "public"."role"
  DROP CONSTRAINT "role_event_id_fkey",
  ADD CONSTRAINT "role_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE CASCADE;

ALTER TABLE "public"."volunteer_role"
  DROP CONSTRAINT "volunteer_role_role_id_fkey",
  ADD CONSTRAINT "volunteer_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE CASCADE;
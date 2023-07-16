BEGIN;

--~ Create domain

--& Check email

CREATE DOMAIN EMAIL AS TEXT CHECK (
    VALUE ~ '^(?#email)[-a-zA-Z0-9.-_]+@[\w-]+(?:\.[\w-]{2,4})$'
);

--& Check password

-- Minimum 8 characters - at least 1 number, one min, one maj, un one special character min

CREATE DOMAIN PWD AS TEXT CHECK (
    VALUE ~ '^(?#password)(?=.*[0-9])(?=.*[-a-z])(?=.*[-A-Z])(?=.*[^a-zA-Z0-9]).{8,}$'
);

--& Check links

-- CREATE DOMAIN LINK_URL AS TEXT CHECK (

--     VALUE ~ '((https?:\/\/)|(www.))[a-zA-Z0-9.@:%._+~#=]{1,}.[-a-zA-Z0-9()]{1,}\.[-a-z]{1,6}\M'

-- );

CREATE TABLE IF NOT EXISTS "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "role_id" INTEGER NOT NULL DEFAULT 2,
    "username" VARCHAR(50) NOT NULL UNIQUE,
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "avatar" TEXT,
    "email" EMAIL NOT NULL UNIQUE,
    "password" PWD NOT NULL
);

CREATE TABLE IF NOT EXISTS "role" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "article" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "order" SERIAL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "category" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "color" VARCHAR(50),
    "logo" TEXT
);

CREATE TABLE IF NOT EXISTS "article_has_category"
(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "article_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    UNIQUE ("article_id", "category_id")
);

ALTER TABLE IF EXISTS "user"
    ADD FOREIGN KEY ("role_id")
    REFERENCES "role" ("id") 
    MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS "article"
    ADD FOREIGN KEY ("user_id")
    REFERENCES "user" ("id") 
    MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS "article_has_category"
    ADD FOREIGN KEY ("article_id")
    REFERENCES "article" ("id") 
    MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS "article_has_category"
    ADD FOREIGN KEY ("category_id")
    REFERENCES "category" ("id") 
    MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;

--~ Creates composite indexation

COMMIT;
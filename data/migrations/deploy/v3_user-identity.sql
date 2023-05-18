BEGIN;

CREATE TYPE identity AS (
    "id" INT,
    "username" VARCHAR(50),
    "email" EMAIL,
    "password" PWD,
    "role" TEXT
);

--& Function User Identity
CREATE
OR REPLACE FUNCTION user_identity(user_name VARCHAR(50), email_address EMAIL) 
RETURNS SETOF identity AS $$ BEGIN RETURN QUERY (
    SELECT
        U."id",
        U."username",
        U."email",
        U."password",
        R."name" AS role
    FROM
        "role" AS R
        JOIN "user" AS U ON R."id" = U."role_id"
    WHERE
        U."email" = email_address :: EMAIL
    OR U."username" = user_name
);

END $$ LANGUAGE plpgsql VOLATILE;

COMMIT;

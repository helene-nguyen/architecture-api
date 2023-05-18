BEGIN;

--& Create user
CREATE
OR REPLACE FUNCTION create_user(json) 
RETURNS TABLE (inserted_user VARCHAR(50)) AS $$

BEGIN
INSERT INTO
        "user" (
        "username",
        "email",
        "password"
    )
VALUES
(
        ($1 ->> 'username')::VARCHAR(50),
        ($1 ->> 'email')::EMAIL,
        ($1 ->> 'password')::PWD
);
    RETURN QUERY 
    (SELECT "user".username
        FROM "user"
        ORDER BY "user".id DESC LIMIT 1);

    END

$$ LANGUAGE plpgsql VOLATILE;

COMMIT;

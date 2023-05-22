BEGIN;

--& Update user
CREATE
OR REPLACE FUNCTION update_user(json) 
RETURNS TABLE (updated_user VARCHAR(50)) AS $$

BEGIN
UPDATE
    "user" AS U
SET
    "role_id" = COALESCE(($1 ->> 'role_id')::INTEGER, role_id),
    "username" = COALESCE(($1 ->> 'username')::VARCHAR(50), "username"),
    "first_name" = COALESCE(($1 ->> 'first_name')::VARCHAR(50), "first_name"),
    "last_name" = COALESCE(($1 ->> 'last_name')::VARCHAR(50), "last_name"),
    "avatar" = COALESCE(($1 ->> 'avatar')::TEXT, "avatar"),
    "email" = COALESCE(($1 ->> 'email')::EMAIL, "email"),
    "password" = COALESCE(($1 ->> 'password')::PWD,  "password")
    
WHERE
    U."id" = ($1->> 'id')::INT;
    
RETURN QUERY 
    (SELECT U.username 
        FROM "user" AS U
        WHERE U.id = ($1->> 'id')::INT);

END

$$ LANGUAGE plpgsql VOLATILE;

COMMIT;

BEGIN;

DROP TABLE 
"article_has_category", 
"category", 
"article", 
"role", 
"user";

DROP DOMAIN 
EMAIL, 
PWD
CASCADE;

COMMIT;
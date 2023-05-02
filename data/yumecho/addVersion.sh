#!bin/bash

CURRENT_DATE=$(date +'%Y-%m-%d')
CURRENT_TIME=$(date +'_%H:%M:%S')
IS_ROOT="./data"

#~ Function
add_version() {
    touch ./data/migrations/deploy/$1$2.sql
    touch ./data/migrations/revert/$1$2.sql
    touch ./data/migrations/verify/$1$2.sql

    {
        echo "$CURRENT_DATE Time$CURRENT_TIME : Creation of new version: v${VERSION_NUMBER}"
    } >>"./data/datalogs/$CURRENT_DATE-logs.txt"

    {
        echo "BEGIN;



COMMIT;"
    } >>"./data/migrations/deploy/$1$2.sql"

    {
        echo "BEGIN;



COMMIT;"
    } >>"./data/migrations/revert/$1$2.sql"

    {
        echo "BEGIN;



ROLLBACK;"
    } >>"./data/migrations/verify/$1$2.sql"
}

if [[ -d $IS_ROOT ]]; then
    read -p "Version number: " VERSION_NUMBER
    read -p "Complete version message? (no space) " ADD_MSG
    #~ Execute function with argument $1 $2
    add_version v${VERSION_NUMBER} _${ADD_MSG}
else
    echo "You're not on root folder. Go to root..."
fi

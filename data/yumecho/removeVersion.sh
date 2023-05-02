#!bin/bash

CURRENT_DATE=$(date +'%Y-%m-%d')
CURRENT_TIME=$(date +'_%H:%M:%S')
IS_ROOT="./data"

remove_version() {
    rm ./data/migrations/deploy/$1$2.sql
    rm ./data/migrations/revert/$1$2.sql
    rm ./data/migrations/verify/$1$2.sql

    {
        echo "$CURRENT_DATE Time$CURRENT_TIME : Removed version: v${VERSION_NUMBER}"
    } >>"./data/datalogs/$CURRENT_DATE-logs.txt"
}

if [[ -d $IS_ROOT ]]; then
    read -p "Version number: " VERSION_NUMBER
    read -p "Complete version message? (no space) " ADD_MSG

    remove_version v${VERSION_NUMBER} _${ADD_MSG}
else
    echo "You're not on root folder. Go to root..."
fi

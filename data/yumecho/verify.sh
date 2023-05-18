#!bin/bash

read -p "Linux or Windows OS? (l/w) " OS_NAME
read -p "Version number to verify: " VERSION_NUMBER
IS_ROOT="./data"

find_file() {
    find $1 -maxdepth 1 -name "*v${VERSION_NUMBER}*"
}

verify_version() {
    for file in "./data/migrations/verify/*.sql"; do

        if [[ "${OS_NAME,,}" =~ (w*) ]]; then
            psql \
                -U ${PGUSER} \
                -d ${PGDATABASE} \
                -h ${PGHOST} \
                -p ${PGPORT} \
                -W \
                -f $(find $file -maxdepth 1 -name "v${VERSION_NUMBER}*")
                
        elif [[ "${OS_NAME,,}" =~ (l*) ]]; then
            sudo -iu postgres \
                psql \
                -U ${PGUSER} \
                -d ${PGDATABASE} \
                -h ${PGHOST} \
                -p ${PGPORT} \
                -W \
                -f $(find $file -maxdepth 1 -name "v${VERSION_NUMBER}*")
        fi
    done

}

if [[ -d $IS_ROOT ]]; then

    set -a # automatically export all variables from .env
    source ./.env
    set +a

    verify_version
else
    echo "You're not on root folder. Go to root..."
fi
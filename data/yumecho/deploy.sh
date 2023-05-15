#!bin/bash

read -p "Linux or Windows OS? (l/w) " OS_NAME
read -p "Version number to deploy: " VERSION_NUMBER
IS_ROOT="./data"

find_file() {
    find $1 -maxdepth 1 -name "*v${VERSION_NUMBER}*"
}

deploy_version() {
    for file in "./data/migrations/deploy/*.sql"; do

        if [[ "${OS_NAME,,}" =~ (w*) ]]; then
            psql \
                -U ${PGUSER} \
                -d ${PGDATABASE} \
                -h ${PGHOST} \
                -p ${PGPORT} \
                -W \
                -f $(find_file $file)

        #   -U user to connect
        #   -d database name
        #   -h hostname
        #   -p port
        #   -W prompt password to encrypt, no trace in logs, password of postgres user
        #   -c command to execute, create a transaction
        #   -f read file
        elif [[ "${OS_NAME,,}" =~ (l*) ]]; then
            sudo -iu postgres \
                psql \
                -U ${PGUSER} \
                -d ${PGDATABASE} \
                -h ${PGHOST} \
                -p ${PGPORT} \
                -W \
                -f $(find_file $file)
        fi
    done

}

if [[ -d $IS_ROOT ]]; then

    set -a # automatically export all variables from .env
    source ./.env
    set +a

    deploy_version
else
    echo "You're not on root folder. Go to root..."
fi

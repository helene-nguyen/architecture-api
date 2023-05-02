#!bin/bash

echo "This script will work for Postgres DB only!"

CURRENT_DATE=$(date +'%Y-%m-%d')
CURRENT_TIME=$(date +'_%H:%M:%S')
IS_ROOT="./data"

if [[ -d $IS_ROOT ]]; then
  set -a # automatically export all variables from .env
  source ./.env
  set +a

  read -p "Linux or Windows OS? (l/w) " OS_NAME
  read -p "New DB name: " DB_NAME
  read -p "New role name: " DB_ROLE
  # read -p -s "Database password: " DB_PASSWORD;

  if [[ "${OS_NAME,,}" =~ (w*) ]]; then
    psql \
      -U postgres \
      -d postgres \
      -h ${PGHOST} \
      -p ${PGPORT} \
      -W \
      -c "CREATE DATABASE ${DB_NAME};" \
      -c "CREATE ROLE ${DB_ROLE}; " \
      -c "\password ${DB_ROLE}" \
      -c "ALTER ROLE ${DB_ROLE} WITH LOGIN;
        ALTER DATABASE ${DB_NAME} OWNER TO ${DB_ROLE};"

  #   -U user to connect
  #   -d database name
  #   -h hostname
  #   -p port
  #   -W prompt password to encrypt, no trace in logs, password of postgres user
  #   -c command to execute, create a transaction
  elif [[ "${OS_NAME,,}" =~ (l*) ]]; then
    sudo -iu postgres \
      psql \
      -U postgres \
      -d postgres \
      -h ${PGHOST} \
      -p ${PGPORT} \ 
    -W \ 
    -c "CREATE DATABASE ${PGDATABASE};" \
      -c "CREATE ROLE ${PGUSER}; " \
      -c "\password ${PGUSER}"
  fi

  mkdir ./data/datalogs
  touch ./data/datalogs/$CURRENT_DATE-logs.txt

  mkdir ./data/migrations/deploy
  mkdir ./data/migrations/revert
  mkdir ./data/migrations/verify

  if [[ -f "./data/datalogs/$CURRENT_DATE-logs.txt" ]]; then
    {
      echo "$CURRENT_DATE Time$CURRENT_TIME : Initialisation complete!"
    } >"./data/datalogs/$CURRENT_DATE-logs.txt"
  else
    echo "This file does NOT exist. Creation..."
    touch ./data/datalogs/$CURRENT_DATE-logs.txt
    {
      echo "$CURRENT_DATE Time$CURRENT_TIME : Initialisation complete!"
    } >"./data/datalogs/$CURRENT_DATE-logs.txt"
  fi

else
  echo "You're not on root folder. Go to root..."
fi

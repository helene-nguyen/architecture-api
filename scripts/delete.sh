#!bin/bash

read -p "Folder name: " FOLDER_NAME
# COMPONENT_NAME_VARIABLE_SHELL=${FOLDER_NAME};
DIRECTORY="./src/domain/${FOLDER_NAME}"

# delete only if length of the folder != 0 => means that we gave a name
if [[ -d "$DIRECTORY" && ${#FOLDER_NAME} != 0 ]]; then
  echo "$DIRECTORY does exist."
  rm -R ./src/domain/${FOLDER_NAME}
  echo 'Folder deleted!'
else
  echo "$DIRECTORY does NOT exist."
  echo 'Folder not deleted!'
fi

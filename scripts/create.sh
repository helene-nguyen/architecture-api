#!bin/bash

read -p "Folder name: " FOLDER_NAME
# COMPONENT_NAME_VARIABLE_SHELL=${FOLDER_NAME};

mkdir ./src/domain/${FOLDER_NAME}
touch ./src/domain/${FOLDER_NAME}/controller.ts
touch ./src/domain/${FOLDER_NAME}/datamapper.ts
touch ./src/domain/${FOLDER_NAME}/model.ts
touch ./src/domain/${FOLDER_NAME}/router.ts
touch ./src/domain/${FOLDER_NAME}/schema.ts
touch ./src/domain/${FOLDER_NAME}/Types.ts

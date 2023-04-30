FOLDER_NAME ?= $(shell bash -c 'read -p "Folder name: " folder_name; echo $$folder_name')
DELETE_FOLDER ?= $(shell bash -c 'read -p "Are you sure? (yes/no) : " answer; echo $$answer')

#& Variables
FOLDER_NAME := ${FOLDER_NAME}
export COMPONENT_NAME_VARIABLE_SHELL=${FOLDER_NAME}


create_domain:
	sh ./scripts/create.sh 

delete_domain:
	sh ./scripts/delete.sh
	echo 'Folder deleted!'

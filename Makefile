# FOLDER_NAME := $(shell bash -c 'read -p "Folder name: " folder_name; echo $$folder_name')
# DELETE_FOLDER := $(shell bash -c 'read -p "Are you sure? (yes/no) : " answer; echo $$answer')

create_domain:
	sh ./scripts/create.sh

delete_domain:
	sh ./scripts/delete.sh;

db_init:
	sh ./data/yumecho/init.sh 

db_add:
	sh ./data/yumecho/addVersion.sh

db_remove:
	sh ./data/yumecho/removeVersion.sh

db_deploy:
	sh ./data/yumecho/deploy.sh 

db_revert:
	sh ./data/yumecho/revert.sh 

db_verify:
	sh ./data/yumecho/verify.sh 
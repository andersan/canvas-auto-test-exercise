build:
	docker-compose down && docker-compose build

all:
	docker-compose down && docker-compose build && docker-compose run wdio-tests

run:
	docker-compose run wdio-tests

sh:
	docker-compose run --entrypoint /bin/bash wdio-tests

app:
	docker-compose run create-app

page:
	docker-compose run add-page

specific-page:
	docker-compose run add-specific-page

block:
	docker-compose run add-block

all-pages:
	docker-compose run all-pages

all-blocks:
	docker-compose run all-blocks

no-extension:
	docker-compose run no-extension

delete-app:
	docker-compose run delete-app

update-color:
	docker-compose run update-color

copy-app:
	docker-compose run copy-app

buy-premium:
	docker-compose run buy-premium

copy-spec-app:
	docker-compose run copy-spec-app

.SILENT:
.PHONY: all run sh

#!/bin/bash
set -ex
echo "Starting up db container"

docker run -d --name mongo_dev -p 6000:27017 -e MONGO_INITDB_ROOT_USERNAME=dev -e MONGO_INITDB_ROOT_PASSWORD=dev mongo
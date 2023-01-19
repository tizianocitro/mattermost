#!/bin/bash

echo "Stopping docker-compose if running."
docker-compose down

DIR=./build/plugins/mattermost-plugin
echo "Checking if the $DIR directory exists."
if [ -d "$DIR" ];
then
    echo "$DIR directory exists. Removing directory..."
    rm -r $DIR
    echo "$DIR directory removed."
else
	echo "$DIR directory does not exist. No need to remove it."
fi

CONTAINER_NAME=mm-ubuntu
CONTAINER_PLUGIN_DIR=/home/mattermost/mattermost-plugin/dist/mattermost-plugin
HOST_PLUGIN_DIR=./build/plugins/
echo "Copying pluging from $CONTAINER_NAME:$CONTAINER_PLUGIN_DIR to $HOST_PLUGIN_DIR."
docker cp $CONTAINER_NAME:$CONTAINER_PLUGIN_DIR $HOST_PLUGIN_DIR
echo "Copy completed."

echo "Starting docker-compose if running."
docker-compose up -d

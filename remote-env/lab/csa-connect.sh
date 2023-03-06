#!/bin/bash

PLUGIN_NAME=cs-aware-connect
CONTAINER_NAME=mm-ubuntu

if [ -z "$1" ]
  then
    echo "Missing plugin name, using default $PLUGIN_NAME."
  else
    PLUGIN_NAME=$1
fi

if [ -z "$2" ]
  then
    echo "Missing container name, using default $CONTAINER_NAME."
  else
    CONTAINER_NAME=$2
fi

echo "Stopping containers if running."
docker compose down
echo "Containers stopped."

DIR=../../build/plugins/$PLUGIN_NAME
echo "Checking if the $DIR directory exists..."
if [ -d "$DIR" ];
then
    echo "$DIR directory exists. Removing directory..."
    rm -r $DIR
    echo "$DIR directory removed."
else
    echo "$DIR directory does not exist. No need to remove it."
fi

PLUGIN_DIR=csa-connect
CONTAINER_PLUGIN_DIR=/home/$PLUGIN_DIR/dist/$PLUGIN_NAME
HOST_PLUGIN_DIR=../../build/plugins/$PLUGIN_NAME
echo "Copying pluging from $CONTAINER_NAME:$CONTAINER_PLUGIN_DIR to $HOST_PLUGIN_DIR."
docker cp $CONTAINER_NAME:$CONTAINER_PLUGIN_DIR $HOST_PLUGIN_DIR
echo "Copy completed."

echo "Starting containers..."
docker compose up -d
echo "Containers started."

echo "Cleaning up older volumes..."
docker volume prune -f
echo "Completed."
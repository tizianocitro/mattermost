#!/bin/bash

USER=user
HOST=host
CONTAINER=cs-connect-base
DIR=csa-connect

# Execute tar command inside container to create archive
ssh $USER@$HOST "docker exec $CONTAINER tar -czvf home/$DIR.tar.gz home/$DIR"

# Copy the archive from the container to the remote machine
ssh $USER@$HOST "docker cp $CONTAINER:/home/$DIR.tar.gz /home/$USER/backups/$DIR.tar.gz"

# Copy the archive from the remote machine to the local machine
scp $USER@$HOST:/home/$USER/$DIR.tar.gz ./backups/$DIR.tar.gz


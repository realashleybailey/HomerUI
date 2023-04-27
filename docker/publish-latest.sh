#!/bin/bash

# Set the name and tag for your Docker image
IMAGE_NAME="homerui"
TAG="latest"

# Build the Docker image using the Dockerfile in the current directory
docker build -t realashleybailey/$IMAGE_NAME:$TAG .

# Push the image to Docker Hub
docker push realashleybailey/$IMAGE_NAME:$TAG
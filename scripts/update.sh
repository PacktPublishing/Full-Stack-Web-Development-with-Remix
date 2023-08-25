#!/bin/bash

# Ensure the script receives a version number as an argument
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <version>"
    exit 1
fi

VERSION=$1

# Use a single command string to append the version to each package
INSTALL_CMD="npm i @remix-run/express@$VERSION @remix-run/node@$VERSION @remix-run/react@$VERSION @remix-run/dev@$VERSION @remix-run/eslint-config@$VERSION"

# Use the run.sh script to execute the install command in subfolders
./scripts/run.sh "$INSTALL_CMD"
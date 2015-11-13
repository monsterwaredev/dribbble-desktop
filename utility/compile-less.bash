#!/bin/bash

DIST_PATH="./static/styles/dist"

function rcompile {
    if [ -e $1 ]; then
        echo "please include a less source path"
        exit 1
    fi
    if [ -f "./static/styles/$1" ]; then
        filename=$(basename "$1")
        filename="${filename%.*}"
        lessc "./static/styles/$1" "$DIST_PATH/core/$filename.css"
    else
        for lessfile in ./static/styles/$1/*.less
        do
            if [[ -f $lessfile ]]; then
                filename=$(basename "$lessfile")
                filename="${filename%.*}"
                lessc "./static/styles/$1/$filename.less" "$DIST_PATH/$1/$filename.css"
            fi
        done
    fi
}

# Install less compiler if lessc command is not found
if ! which lessc > /dev/null; then
    sudo npm install less -g
fi

# Create stylesheet dist folder
if [ -d "$DIST_PATH" ]; then
    rm -rf $DIST_PATH
fi
mkdir -p $DIST_PATH/{core,components,ui}

# Compile less files
rcompile application.less
rcompile components
rcompile ui

[[ $? -eq 0 ]]  && echo "LESS source compiled successfully"

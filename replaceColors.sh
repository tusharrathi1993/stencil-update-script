#!/bin/sh

cleanup_before_exit() {
    # Add your command(s) here
    echo "Executing command before exit..."
    # command_to_run_before_exit
    rm -rf replaceColors.sh stencil-update-script
}

trap cleanup_before_exit EXIT

node ./stencil-update-script/stencil-replace-colors/replaceColors.js $1
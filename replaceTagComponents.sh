#!/bin/sh

cleanup_before_exit() {
    # Add your command(s) here
    echo "Executing command before exit..."
    # command_to_run_before_exit
    rm -rf replaceTagComponents.sh stencil-update-script
}

trap cleanup_before_exit EXIT

node ./stencil-update-script/stencil-replace-tag-components/replaceTagComponents.js $1
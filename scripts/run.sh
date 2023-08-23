#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <command>"
    exit 1
fi

command_to_run="$1"

# Custom recursive function to find package.json
find_package() {
    local current_dir="$1"
    
    # If node_modules is found, return early
    if [ "$(basename "$current_dir")" == "node_modules" ]; then
        return
    fi
    
    # If package.json is found, run the command
    if [ -f "$current_dir/package.json" ]; then
        echo "Executing '$command_to_run' in directory $current_dir"
        (cd "$current_dir" && eval "$command_to_run")
        return
    fi

    # Otherwise, continue to search in subdirectories
    for subdir in "$current_dir"/*; do
        if [ -d "$subdir" ]; then
            find_package "$subdir"
        fi
    done
}

# Find all directories named 'bee-rich'
find . -type d -name 'bee-rich' | while read dir; do
    find_package "$dir"
done
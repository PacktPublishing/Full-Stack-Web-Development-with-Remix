#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <path>"
    exit 1
fi

# Base directory provided as argument
BASE_DIR="$1"

# Source and target directories
SRC_DIR="${BASE_DIR}/app/routes"
TARGET_DIR="${BASE_DIR}/app/flatroutes"

# Create target directory if it doesn't exist
mkdir -p "${TARGET_DIR}"

# Function to convert folder path into the V2 filename format
convert_to_v2_name() {
    local relpath="$1"
    local filename="$2"

    # Replace forward slashes with dots
    local newpath="${relpath//\//.}"

    # Prefix underscore to folders starting with __
    newpath="${newpath//.__/_}"
    newpath="${newpath//__/_}" # Adjust double underscores to single underscore

    # For files directly under routes, remove the prefixed dot
    [[ "$newpath" == "." ]] && newpath=""

    # For files named "index.tsx", prefix with an underscore
    [[ "$filename" == "index.tsx" ]] && filename="_index.tsx"

    # Adjust filenames starting with double underscores to single underscore
    filename="${filename//__/_}"

    echo "${newpath}${newpath:+.}${filename}"
}

# Recursively find all files in SRC_DIR and process each file
find "${SRC_DIR}" -type f | while read -r filepath; do
    relpath="${filepath#${SRC_DIR}/}"          # Extract relative path
    folderpath="$(dirname "$relpath")"         # Extract folder path from relative path
    filename="$(basename "$relpath")"          # Extract filename

    # Convert folder path to V2 naming
    newfilename=$(convert_to_v2_name "$folderpath" "$filename")

    # Log the transformation
    echo "Move ${relpath} -> ${newfilename}"

    # Copy contents from source file to target file
    cp "${filepath}" "${TARGET_DIR}/${newfilename}"
done

# Delete the routes folder
rm -rf "${SRC_DIR}"

# Rename the flatroutes folder to routes
mv "${TARGET_DIR}" "${SRC_DIR}"

echo "Transformation completed!"
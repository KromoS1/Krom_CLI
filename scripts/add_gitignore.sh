#!/bin/bash

current_dir="$PWD";
script_path="$(dirname "$(realpath "$0")")"

cd "$script_path"

krom_dir=$(dirname "$PWD");

source $script_path/common.sh;

cd ~ && cd $current_dir;

echo "$PWD pwd";

echo -e "${YELLOW}Копирование файла .gitignore из шаблона";

cp $krom_dir/.gitignore ./;
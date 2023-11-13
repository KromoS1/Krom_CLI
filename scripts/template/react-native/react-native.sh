#!/bin/bash

GREEN='\033[0;32m'      #  ${GREEN}
CYAN='\033[0;36m'       #  ${CYAN}
YELLOW='\033[0;33m'     #  ${YELLOW}
BREAK='\033[m'       #  ${BREAK}
BOLD='\033[1m'       #  ${BOLD}  

app_name="$1";

current_dir="$PWD";

script_path="$(dirname "$(realpath "$0")")";

cd "$script_path"

echo "${CYAN}<---Application creation--->";

cd ~ && cd $current_dir;

bun create expo-app $app_name --template expo-template-blank-typescript;

cd ./$app_name;

bun install;
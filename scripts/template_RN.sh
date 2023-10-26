#!/bin/bash

current_dir="$PWD";
script_path="$(dirname "$(realpath "$0")")"

cd "$script_path"

krom_dir=$(dirname "$PWD");

source $script_path/common.sh;

echo -e "${CYAN}<---Создание приложения--->";

echo -e "${YELLOW}Введите название приложения:";
read app_name; 

cd ~ && cd $current_dir;

bun create expo-app $app_name -t expo-template-blank-typescript;

cd ./$app_name;

echo -e "${CYAN}<---Установка нунжых зависимостей--->${BREAK}";

bun install @react-navigation/native compose-function expo-localization i18next react-i18next react-native-exception-handler react-native-gesture-handler react-native-restart react-native-safe-area-context react-native-screens;

bun install @types/compose-function -D;

echo -e "${CYAN}<---Создание FSD структуры--->${BREAK}";

source $script_path/fsd_structure.sh;

echo -e "${CYAN}<---Копирование основных файлов шаблона--->${BREAK}";

cd ~ && cd $current_dir/$app_name;

# rm tsconfig.json;
# rm App.tsx;
rm app.json;

cp $krom_dir/templates/react-native/tsconfig.json ./tsconfig.json;
cp $krom_dir/templates/react-native/App.tsx ./App.tsx;
cp $krom_dir/templates/react-native/i18n.ts ./;
cp $krom_dir/templates/react-native/.babelrc.json ./;

cp -r $krom_dir/templates/react-native/config ./;
cp -r $krom_dir/templates/react-native/lang ./;
cp -r $krom_dir/templates/react-native/src/app/providers ./src/app;
cp -r $krom_dir/templates/react-native/src/app/index.tsx ./src/app/index.tsx;

cp -r $krom_dir/templates/vscode/settings.json ./.vscode/settings.json;
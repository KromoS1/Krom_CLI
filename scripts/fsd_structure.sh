#!/bin/zsh;

dir_path="$(dirname "$(realpath "$0")")"

source $dir_path/common.sh;

# echo -e "${CYAN}Проверка и установка incubator-cli${BREAK}";

# npm install -g incubator-cli;

echo -e "${CYAN}Установка слушателя incubator-cli${BREAK}";

incubator install linters;

mkdir "src";

cd ./src;

mkdir 'app' && cd ./app && touch index.tsx && cd ../;
mkdir 'processes' && cd ./processes && touch index.tsx && cd ../;
mkdir 'pages' && cd ./pages && touch index.tsx && cd ../;
mkdir 'widgets' && cd ./widgets && touch index.tsx && cd ../;
mkdir 'features' && cd ./features && touch index.tsx && cd ../;
mkdir 'entities' && cd ./entities && touch index.tsx && cd ../;
mkdir 'shared' && cd ./shared && touch index.tsx && cd ../;

touch index.tsx;

cd ../;

rm yarn.lock;

echo -e "${CYAN}Обновляю файл .eslintrc.js${BREAK}";

echo "module.exports = {
  extends: [
    'eslint-config-it-incubator',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:boundaries/recommended',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': { typescript: {} },
    'boundaries/elements': [
      { type: 'pages', pattern: 'pages/*' },
      { type: 'App', pattern: 'app/*' },
      { type: 'processes', pattern: 'processes/*' },
      { type: 'pagesLayer', pattern: 'pagesLayer/*' },
      { type: 'widgets', pattern: 'widgets/*' },
      { type: 'features', pattern: 'features/*' },
      { type: 'entities', pattern: 'entities/*' },
      { type: 'shared', pattern: 'shared/*' },
    ],
    'boundaries/ignore': ['**/*.test.*'],
  },
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
        pathGroups: [
          { group: 'internal', position: 'after', pattern: '@/App/**' },
          { group: 'internal', position: 'after', pattern: '@/processes/**' },
          { group: 'internal', position: 'after', pattern: '@/pagesLayer/**' },
          { group: 'internal', position: 'after', pattern: '@/widgets/**' },
          { group: 'internal', position: 'after', pattern: '@/features/**' },
          { group: 'internal', position: 'after', pattern: '@/entities/**' },
          { group: 'internal', position: 'after', pattern: '@/shared/**' },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            message: 'Private imports are prohibited from @/pages, use public imports instead',
            group: ['@/pages/**'],
          },
          {
            message: 'Private imports are prohibited from @/App, use public imports instead',
            group: ['@/App/**'],
          },
          {
            message: 'Private imports are prohibited from @/processes, use public imports instead',
            group: ['@/processes/*/**'],
          },
          {
            message: 'Private imports are prohibited from @/pagesLayer, use public imports instead',
            group: ['@/pagesLayer/*/**'],
          },
          {
            message: 'Private imports are prohibited from @/widgets, use public imports instead',
            group: ['@/widgets/*/**'],
          },
          {
            message: 'Private imports are prohibited from @/features, use public imports instead',
            group: ['@/features/*/**'],
          },
          {
            message: 'Private imports are prohibited from @/entities, use public imports instead',
            group: ['@/entities/*/**'],
          },
          {
            message: 'Private imports are prohibited from @/shared, use public imports instead',
            group: ['@/shared/*/*/**'],
          },
          {
            message: 'Prefer absolute imports instead of relatives (for root modules)',
            group: ['../**/pages'],
          },
          {
            message: 'Prefer absolute imports instead of relatives (for root modules)',
            group: ['../**/App'],
          },
          {
            message: 'Prefer absolute imports instead of relatives (for root modules)',
            group: ['../**/processes'],
          },
          {
            message: 'Prefer absolute imports instead of relatives (for root modules)',
            group: ['../**/pagesLayer'],
          },
          {
            message: 'Prefer absolute imports instead of relatives (for root modules)',
            group: ['../**/widgets'],
          },
          {
            message: 'Prefer absolute imports instead of relatives (for root modules)',
            group: ['../**/features'],
          },
          {
            message: 'Prefer absolute imports instead of relatives (for root modules)',
            group: ['../**/entities'],
          },
          {
            message: 'Prefer absolute imports instead of relatives (for root modules)',
            group: ['../**/shared'],
          },
        ],
      },
    ],
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          {
            from: 'pages',
            allow: ['App', 'processes', 'pagesLayer', 'widgets', 'features', 'entities', 'shared'],
          },
          {
            from: 'App',
            allow: ['processes', 'pagesLayer', 'widgets', 'features', 'entities', 'shared'],
          },
          { from: 'processes', allow: ['pagesLayer', 'widgets', 'features', 'entities', 'shared'] },
          { from: 'pagesLayer', allow: ['widgets', 'features', 'entities', 'shared'] },
          { from: 'widgets', allow: ['features', 'entities', 'shared'] },
          { from: 'features', allow: ['entities', 'shared'] },
          { from: 'entities', allow: ['shared'] },
          { from: 'shared', allow: ['shared'] },
        ],
      },
    ],
  },
  overrides: [
    { files: ['**/*.test.*', '**/*.scss'], rules: { 'boundaries/element-types': 'off' } },
  ],
}" > .eslintrc.js;

echo -e "${GREEN}Создание структуры завершено";
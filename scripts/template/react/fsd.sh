#!/bin/bash;

GREEN='\033[0;32m'      #  ${GREEN}
CYAN='\033[0;36m'       #  ${CYAN}
YELLOW='\033[0;33m'     #  ${YELLOW}
BREAK='\033[m'       #  ${BREAK}
BOLD='\033[1m'       #  ${BOLD}  

current_dir="$PWD";

script_path="$(dirname "$(realpath "$0")")"

cd "$script_path"

app_name="$1";

cd ~ && cd $current_dir/$app_name;

echo "${CYAN}Inspection and installation incubator-cli${BREAK}";

bun install incubator-cli;

echo "${CYAN}Listener Setup incubator-cli${BREAK}";

incubator install linters;

mkdir -p "src";

cd ./src;

mkdir -p 'app' && cd ./app && touch index.tsx && cd ../;
mkdir -p 'processes' && cd ./processes && touch index.tsx && cd ../;
mkdir -p 'pages' && cd ./pages && touch index.tsx && cd ../;
mkdir -p 'widgets' && cd ./widgets && touch index.tsx && cd ../;
mkdir -p 'features' && cd ./features && touch index.tsx && cd ../;
mkdir -p 'entities' && cd ./entities && touch index.tsx && cd ../;
mkdir -p 'shared' && cd ./shared && touch index.tsx && cd ../;

touch index.tsx;

cd ../;

rm yarn.lock;
rm package-lock.json;

echo "${CYAN}File update .eslintrc.js${BREAK}";

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
      { type: 'app', pattern: 'app/*' },
      { type: 'processes', pattern: 'processes/*' },
      { type: 'pages', pattern: 'pages/*' },
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
          { group: 'internal', position: 'after', pattern: '@/app/**' },
          { group: 'internal', position: 'after', pattern: '@/processes/**' },
          { group: 'internal', position: 'after', pattern: '@/pages/**' },
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
            message: 'Private imports are prohibited from @/app, use public imports instead',
            group: ['@/app/**'],
          },
          {
            message: 'Private imports are prohibited from @/processes, use public imports instead',
            group: ['@/processes/*/**'],
          },
          {
            message: 'Private imports are prohibited from @/pages, use public imports instead',
            group: ['@/pages/*/**'],
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
            group: ['../**/app'],
          },
          {
            message: 'Prefer absolute imports instead of relatives (for root modules)',
            group: ['../**/processes'],
          },
          {
            message: 'Prefer absolute imports instead of relatives (for root modules)',
            group: ['../**/pages'],
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
            from: 'app',
            allow: ['processes', 'pages', 'widgets', 'features', 'entities', 'shared'],
          },
          { from: 'processes', allow: ['pages', 'widgets', 'features', 'entities', 'shared'] },
          { from: 'pages', allow: ['widgets', 'features', 'entities', 'shared'] },
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

echo "${GREEN}The structure is complete";
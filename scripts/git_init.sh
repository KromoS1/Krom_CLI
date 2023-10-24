#!/bin/bash

echo "Начинаю инициализацию гита";
git init && git add . && git commit -m "init commit" && git branch -M main && git remote add origin git@github.com:KromoS1/React_CDN.git && git push -u origin main;
echo "Инициализация закончена";
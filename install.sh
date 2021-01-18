#!/bin/bash

unzip-from-link() {
 local download_link=$1; shift || return 1
 local temporary_dir

 temporary_dir=$(mktemp -d) \
 && curl -LO "${download_link:-}" > /dev/null 2>&1 \
 && unzip -d "$temporary_dir" \*.zip > /dev/null 2>&1 \
 && rm -rf \*.zip \
 && mv "$temporary_dir"/* ${1:-"./"} \
 && rm -rf $temporary_dir
}

echo "Downloading Frontend files..."
unzip-from-link "https://github.com/malkhazidartsmelidze/chessable-task/archive/frontend.zip"

echo "Downloading Backend files..."
unzip-from-link "https://github.com/malkhazidartsmelidze/chessable-task/archive/backend/laravel.zip"

echo "Installing Frontend Application Packages..."
cd ./chessable-task-frontend
npm i 

echo "Installing Backend Application Packages..."
cd ../chessable-task-backend-laravel
composer install
cp .env.example .env
cd ../

clear
echo -e "\e[42m \e[30m Application Successfylly Installed \e[49m \e[97m"

echo -e "To run backend App type: \n \e[32mcd ../chessable-task-backend-laravel && php artisan serve --port 8001 \e[97m"
echo -e "To run frontend App type: \n \e[32mcd ../chessable-task-frontend && npm start "

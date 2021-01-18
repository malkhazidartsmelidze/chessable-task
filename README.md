# HR Management System

## Inntalation instructions:

- `git clone https://github.com/malkhazidartsmelidze/chessable-task.git`
- `cd backend` And `cp .env.example .env`
- Enter your MySql DB credentials
- Run `php artisan db:seed`, then confirm that you want to overwrite old data (runs command: `php artisan migrate:fresh && php artisan db:seed`)
- Run app on 8001 port using `php artisan serve --port 8001`

- `cd ../frontend`
- Run `npm install` to install all packages
- Run `npm run start`

## Application is ready!

## You can download brances separately as well:

### To download and run current backend app follow these steps:

- Download `backend/laravel` branch as zip from url: https://github.com/malkhazidartsmelidze/chessable-task/archive/backend/laravel.zip
- Unzip folder to any folder and `cd` in it
- Run `composer install` to install packages
- Copy `.env.example` file to `.env` file (`cp .env.example .env`)
- Enter your MySql DB credentials
- Run `php artisan db:seed`, then confirm that you want to overwrite old data (runs command: `php artisan migrate:fresh && php artisan db:seed`)
- Run app on 8001 port using `php artisan serve --port 8001`

### To download and run current frontend app follow these steps:

- Download `frontend` branch as zip from url: https://github.com/malkhazidartsmelidze/chessable-task/archive/frontend.zip
- Unzip folder to any folder and `cd` in it
- Run `npm install` to install all packages
- Run `npm run start`

## Application is ready!

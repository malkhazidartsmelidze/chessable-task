# HR Management System

## To download and run current backend app follow these steps:

-   Download `backend/laravel` branch as zip from url: https://github.com/malkhazidartsmelidze/chessable-task/archive/backend/laravel.zip
-   Unzip folder to any folder and `cd` in it
-   Run `composer install` to install packages
-   Copy `.env.example` file to `.env` file
-   Enter your MySql DB credentials
-   Run `php artisan db:seed`, then confirm that you want to overwrite old data (runs command: `php artisan migrate:fresh && php artisan db:seed`)
-   Run app on 8001 port using `php artisan serve --port 8001`

### Application is ready for requests!

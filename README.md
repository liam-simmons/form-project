# Finer Vision Dev Test

This is a full-stack test, focusing mostly on the front-end results. This repository serves are the base template for your test.

Start by following the quick start steps.

Read the full specification [here](https://bit.ly/fv-dev-test).

### Quick Start

```bash
# Setup ENV (update DB_* to match your local DB environment)
cp .env.example .env

# Install server dependencies
composer install

# Generate APP_KEY ENV
php artisan key:generate

# Install client dependencies
npm install

# Start server
php artisan serve --port=8080

# (In a new terminal session) Transpile client files on file saves
npm run watch
```

Start editing the frontend files located inside the `src` directory. Changes will be automatically reloaded inside the browser, running at [localhost:8080](http://localhost:8080).

### Quick Start (Docker)

Install the [docker client](https://docs.docker.com/#run-docker-anywhere) if you machine doesn't already have it installed.

```bash
cp .env.example .env
docker-compose up --build # On first run will take ~5 mins, depending on your machine's hardware
```

After all containers are running, run:

```bash
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan migrate:refresh --seed
```

Start editing the frontend files located inside the `src` directory. Changes will be automatically reloaded inside the browser, running at [localhost:8080](http://localhost:8080).

Add a new composer package:

```bash
docker-compose exec app composer require package
```

Add a new npm package:

```bash
docker-compose exec client npm add package
```

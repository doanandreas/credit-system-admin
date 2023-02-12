# credit-system-admin
Credit system simulation for a car purchasing site DjuBli.

## Setup
Requires NPM, Yarn, and Docker to run.

Steps to run app:
1. Run Postgres with Docker.
```bash
$ docker run --name creditsystem-db -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```
2. Run the app once. Required to apply migration for database.
```bash
$ yarn dev
```
3. Seed the database with default user, leasings, and cars.
```bash
$ yarn seed:up
```
Done! You are ready to use the app from `localhost:5000`.

## Postman Setup
In `postman` folder is provided collection and environment as example to run the app. Import both to start using the app.

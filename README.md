# Gaby&Alvaro Wedding 2024

This project was created using NodeJs + Express + PostgreSQL

### Run project locally

1. Create your postgresql db and add to the .env file the params to access your local database and the port for running the server

- PORT
- DB_USER
- DB_PASSWORD
- DB_NAME
- DB_HOST
- MAX_POOL_SIZE
- LOGGER_LEVEL
- DB_PORT

2. Install all the dependencies
```bash
npm install
```
3. Run migrations
```bash
npm run migrate
```
4. Run seed
```bash
npm run seed
```
5. Run the server in specified
```bash
npm run dev
```
# 13. Deferring Loader Data

In this chapter, we will learn how to defer loader data to enhance the user experience.

## Getting started

### Run the application

Follow these steps to get your application up and running:

1. Make sure you have a `.env` file in the root of your project and that it contains the following:

```text
DATABASE_URL="file:./dev.db"
SESSION_SECRET="[A secret string]"
```

2. Install the dependencies.

```bash
npm install
```

3. Generate the Prisma client

```bash
npm run build
```

4. Update the SQLite database schema

```bash
npm run update:db
```

5. Start the development server

```bash
npm run dev
```

This starts the development server on port `3000`. You can now open the application in your browser at [http://localhost:3000](http://localhost:3000).

In case you receive Prisma errors during build, schema update, or runtime, you can reset the database by running the following command:

```bash
npm run reset:db
```

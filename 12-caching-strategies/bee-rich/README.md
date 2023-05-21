# 12. Caching Strategies

In this chapter, we will learn about different caching strategies and how to use them with Remix.

## Getting started

There is nothing to set up for this chapter! You can go ahead and use [the solution code from the previous chapter](../../11-optimistic-ui/bee-rich/solution/) to get started with _Chapter 12, Caching Strategies_.

Happy coding!

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

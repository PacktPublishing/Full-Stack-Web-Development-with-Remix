# 7. Error Handling in Remix

In this chapter, you will learn about error handling in Remix. We will work with Remix's `ErrorBoundary` and `CatchBoundary` components to handle errors in a declarative way. We will also revisit the concept of throwing responses in `loader` and `action` functions.

## Getting started

You can start right where you left off and use the code from the previous chapter to get started with _Chapter 7, Error Handling in Remix_.

- If you want to start from scratch, you can find the [solution code from the previous chapter](../../06-enhancing-the-user-experience/bee-rich/solution/).
- If you are stuck or need a hint, check the [solution code for this chapter](./solution/).

Happy coding!

### Run the application

Follow these steps to get your application up and running:

1. Make sure you have a `.env` file in the root of your project and that it contains the following line:

```text
DATABASE_URL="file:./dev.db"
```

2. Install the dependencies.

```bash
npm install
```

3. Generate the Prisma client

```bash
npm run build
```

4. Update the MySQL database schema

```bash
npm run update:db
```

5. Start the development server

```bash
npm run dev
```

This starts the development server on port `3000`. You can now open the application in your browser at [http://localhost:3000](http://localhost:3000).
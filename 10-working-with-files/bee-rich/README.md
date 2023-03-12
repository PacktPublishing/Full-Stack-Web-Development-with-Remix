# 10. Working with files

In this chapter, we will learn how to work with files in Remix. We will start by adding a file. We will then learn how to read the uploaded file and display its contents in the browser. Finally, we will discuss third-party services that can be used to store files.

## Getting started

Before we get started, we have to clean up our experiments from the previous chapter.

If you want to reuse your code from the previous chapter, then follow this guide to get to the starting point of this chapter. Otherwise, feel free to checkout the code in the [start](./start/) folder and dive right into _Chapter 10, Working with Files_.

### Run the application

Follow these steps to get your application up and running:

1. Make sure you have a `.env` file in the root of your project and that it contains the following line:

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

4. Update the MySQL database schema

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

## Cleaning up

In the laster chapter, we experimented with route-scoped CSS files and added some questionable custom styling to the login page. Let's remove that code now.

1. **Remove the login.css file**

Delete the `app/styles/login.css` file from your project.

2. **Remove the `login.css` import from the `app/routes/__layout/login.tsx`**

```diff
- import loginCSS from '~/styles/login.css';
-
- export const links: LinksFunction = () => [{ rel: 'stylesheet', href: loginCSS }];
```

Also, remove the `LinksFunction` type import as it is no longer needed.

Sweet! We are now ready to start working with files. Jump right into _Chapter 10, Working with Files_. 🎉

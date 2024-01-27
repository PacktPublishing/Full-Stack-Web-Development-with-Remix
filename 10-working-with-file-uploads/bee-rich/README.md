# 10. Working with file uploads

In this chapter, we will add file uploads to BeeRich. We will start by adding file attachments to the create and edit forms. Next, we will update the `action` functions to process the file uploads on the server. We will also learn how to authorize access to uploaded files and how to serve them to the client.

## Getting started

Before we get started, we have to clean up our experiments from the previous chapter.

If you want to reuse your code from the previous chapter, then follow this guide to get to the starting point of this chapter. Otherwise, feel free to checkout the code in the [start](./start/) folder and dive right into _Chapter 10, Working with File Uploads_.

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

6. Seed the database with test data

```bash
npm run seed
```

This is optional, but can be helpful for testing. Note that with the current setup, you can only seed the database once. After that, `npm run seed` will fail on the unique email constraint during the test user creation.
Test credentials:

- Email: john.doe@example.com
- Password: BeeRich

You can also update the seed data in `prisma/seed.ts`.

## Cleaning up

In the laster chapter, we experimented with route-scoped CSS files and added some questionable custom styling to the login page. We also created a resource route for a static `robots.txt` file. Let's remove that code now.

1. **Remove the login.css file**

Delete the `app/styles/login.css` file from your project.

2. **Remove the `login.css` import from `app/routes/_layout/login.tsx`**

```diff
- import loginCSS from '~/styles/login.css';
-
- export const links: LinksFunction = () => [{ rel: 'stylesheet', href: loginCSS }];
```

Also, remove the `LinksFunction` type import as it is no longer needed.

3. **Remove the `app/routes/robots[.txt].tsx` file**

We moved the content of the `robots.txt` file into `app/routes/robots[.txt.].tsx` to practice working with resource routes. However, since the content for the `robots.txt` is static, let's create a `robots.txt` file in the `/public` folder instead.

First, delete the `app/routes/robots[.txt.].tsx` file. Next, paste the following content into the new `public/robots.txt` file:

```txt
User-agent: *
Disallow: /dashboard/
Allow: /login
Allow: /signup
Allow: /$
```

Sweet! We are now ready to start working with files. Jump right into _Chapter 10, Working with File Uploads_. 🎉

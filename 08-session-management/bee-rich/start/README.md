# BeeRich

## Getting started

**Welcome!** BeeRich is a dashboard-like application that mimics both personal and enterprise use cases. BeeRich is a personal finance management application that helps you stay on top of your beekeep - pardon me - bookkeeping.

### Run the application

To run the application, you need to install the dependencies and start the development server:

```sh
npm install
npm run dev
```

This will start the development server on port `3000`. You can now open the application in your browser at [http://localhost:3000](http://localhost:3000).

#### Chapter 5

Once we add the database in Chapter 5, you will need to run the following commands to set up the database and run the application:

```
npm install
npm run build
npm run update:db
npm run dev
```

Also, make sure to add a `.env` file to the root of the project with the following content:

```text
DATABASE_URL="file:./dev.db"
```

If there are issues with the database setup, you can run `npm run reset:db` to reset the database.

Run `npm run seed` to populate the database with seed data.

Test credentials:

- Email: john.doe@example.com
- Password: BeeRich

You can also make changes to the seed data in `prisma/seed.ts`.

#### Chapter 8

Once we add authentication in Chapter 8, you need to add a session secret to the `.env` file:

```text
DATABASE_URL="file:./dev.db"
SESSION_SECRET="[A secret string]"
```

### Dependencies

Important dependencies we will work with in this book:

- [clsx](https://www.npmjs.com/package/clsx): A helper for constructing className strings conditionally.
- [prisma](https://www.prisma.io/): A modern database toolkit for TypeScript and Node.js.
- [tailwindcss](https://tailwindcss.com/): A utility-first CSS framework.
- [zod](https://www.npmjs.com/package/zod): A TypeScript-first schema declaration and validation library.

### Scripts

Scripts the initial version of BeeRich comes with:

- `npm run routes` - prints the routes hierarchy
- `npm run typecheck` - runs the TypeScript compiler to check for type errors
- `npm run format` - runs all the formatting scripts
- `npm run format:lint` - runs eslint and fixes errors
- `npm run clean` - deletes all generated files and folders and installs dependencies
- `npm run build` - runs all the build scripts
- `npm run build:remix` - builds the Remix application
- `npm run update:remix` - update to the latest version of Remix
- `npm run dev` - runs all the dev scripts in parallel
- `npm run dev:remix` - runs the Remix development server
- `npm run start` - runs the server in production mode

### Recommended VS Code settings and extensions

If you are using VS Code, we recommend installing the following extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Formatting & linting

BeeRich is set up with Prettier and ESLint.

Run `npm run format:lint` from the project's root to fix all lint and format violations.

You can also install the [ESLint VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to fix all lint and format violations on file save. For this, add the following settings to your workspace's user settings (./vscode/settings.json):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[markdown][javascript][javascriptreact][typescript][typescriptreact]": {
    "editor.formatOnSave": false
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

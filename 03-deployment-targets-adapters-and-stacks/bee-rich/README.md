# BeeRich

## Getting started

**Welcome!** BeeRich is a dashboard-like application that mimics both personal and enterprise use cases. BeeRich is a personal finance management application that helps you stay on top of your beekeep - pardon me - bookkeeping. Well, at least that’s the goal. There is nothing much there yet. In every chapter, we will add more code to this application.

Starting with _Chapter 4, Routing in Remix_, there will be a `bee-rich/start` and `bee-rich/solution` folder in each chapter folder. Usually, you want to work on your local copy of BeeRich. However, if you get stuck, you can always refer to the `bee-rich/solution` folder to see the final code for the chapter and fallback to the `bee-rich/start` folder to reset the code to the current chapter's starting point.

Each `bee-rich` folder contains a `README.md` file that contains a **Getting started** section (just like this one!). Additionally, there might be additional sections to help you get started with the chapter.

### Bootstrapping the initial version of BeeRich

Run the following command in a terminal to bootstrap the application:

```sh
npx create-remix@2 --template PacktPublishing/Full-Stack-Web-Development-with-Remix/03-deployment-targets-adapters-and-stacks/bee-rich
```

This uses the BeeRich template from _Chapter 3, Deployment Targets, Adapters, and Stacks_. After following the instructions in the terminal, navigate to the newly created project folder and follow the `Run the application` instructions below

### Bootstrapping later versions of BeeRich

Each chapter iterates on the previous one. If you want to check out a later version of BeeRich, you can find a `start/` and `solution/` version of BeeRich in each chapter folder. We recommend you to work on your local copy of BeeRich, adding the code from each chapter to your local copy. However, if you get stuck, you can always reset the code by checking out the code from the chapters start or solution folder.

To get a later version of BeeRich, you can either clone this repository or you can use `create-remix` to bootstrap BeeRich.

#### Cloning this repository

First, clone this repository:

```sh
https://github.com/PacktPublishing/Full-Stack-Web-Development-with-Remix.git
```

Then, open the `start/` or `solution/` folder that you are interested in in your editor. Then follow the instructions in the book and the `README.md` file of the chapter.

We recommend not opening the entire repository as this may be confusing. Instead, open the `start/` or `solution/` folder of the chapter you are interested in directly as a project in your editor. Next, review the `Run the application` instructions below.

#### Use `create-remix` to bootstrap a specific version of BeeRich

To bootstrap the BeeRich application for a specific chapter, run the following command:

```sh
npx create-remix@2 --template PacktPublishing/Full-Stack-Web-Development-with-Remix/:chapter-name/bee-rich/start
```

Replace `:chapter-name` with the name of the chapter folder name in this repository. For example, to bootstrap the BeeRich application for _Chapter 4, Routing in Remix_, run the following command:

```sh
npx create-remix@2 --template PacktPublishing/Full-Stack-Web-Development-with-Remix/04-routing-in-remix/bee-rich/start
```

You can also replace `start` with `solution` to bootstrap the BeeRich application with the final code for the chapter.

Next, review the `Run the application` instructions.

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

Run `npm run seed` to populate the database with seed data. This is optional, but can be helpful for testing. Note that with the current setup, you can only seed the database once. After that, `npm run seed` will fail on the unique email constraint during the test user creation.

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

## Setting up BeeRich from scratch

Follow the instructions in _Chapter 3, Deployment Targets, Adapters, and Stacks_ to get started with BeeRich.

If you want to set up BeeRich from scratch, you can follow the following instructions below to get to the starting point of _Chapter 4, Routing in Remix_. Note that this is not required to follow the book. You can always use the BeeRich template from _Chapter 3, Deployment Targets, Adapters, and Stacks_ to bootstrap the application.

1. **Use the Remix CLI to create a new Express.js Remix project**

We use the [create-remix](https://www.npmjs.com/package/create-remix) CLI to create a new Remix project. Use the following command to select Remix's Express.js template and create a new project folder called `bee-rich`:

```bash
npx create-remix@2 --template remix-run/remix/templates/express ./bee-rich
```

Follow the instructions in the terminal to set up the project, initialize the git repository, and install the dependencies.

Please refer to _Chapter 2, Creating a new Remix app_ for more information about the `create-remix` script. You can also refer to the [REMIX_README.md](./REMIX_README.md) file for more information about how to work with Remix and the Express.js starter template.

2. **Set up Prettier and ESLint**

We use [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to format and lint our code.

- Install the following packages:

```bash
npm i --save-dev prettier@^2.8.8 eslint@^8.49.0 eslint-config-prettier@^8.10.0 eslint-plugin-html@^7.1.0 eslint-plugin-import@^2.28.1 eslint-plugin-jsx-a11y@^6.7.1 eslint-plugin-prettier@^4.2.1 eslint-plugin-react@^7.33.2 eslint-plugin-simple-import-sort@^10.0.0
```

- Create the following files in the root of your project:
  - `.prettierrc.cjs`
  - `.eslintignore`

- Copy-paste the Prettier and ESLint configurations from the `.prettierrc.cjs` and `.eslintrc.cjs` files in the root of this repository into your project.

- Copy-paste the content of the [.eslintignore](./.eslintignore) file into your project's `.eslintignore` file.

Please feel free to alter the Prettier configuration and add more ESLint packages and rules based on your own preferences.

- You can also install the [ESLint VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to fix all lint and format violations on file save. For that, copy-paste the following content into the .vscode/settings.json file in the root of your project (VS Code Workspace settings):

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

3. **Set up Tailwind CSS**

[Tailwind CSS](https://tailwindcss.com/) is a utility-first CSS framework. We will use Tailwind to compose powerful designs right in our markup.

- Please follow [the instructions in the Remix documentation](https://remix.run/docs/en/2/styling/tailwind) to set up Tailwind CSS.
- Next, copy-paste the additional Tailwind CSS configuration from the [tailwind.config.ts](./tailwind.config.ts) file in the root of this repository into your project.
- Move the `tailwind.css` file into a new `app/styles` folder for better organization.
- Update the code in the `app/root.tsx` file in your project as follows:

```diff
- import { cssBundleHref } from "@remix-run/css-bundle";
+ import tailwindCSS from './styles/tailwind.css';

+ export const links: LinksFunction = () => [{ rel: 'stylesheet', href: tailwindCSS }];
- export const links: LinksFunction = () => [
-   ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
- ];
```

4. **Install clsx**

We will use [clsx](https://www.npmjs.com/package/clsx) to conditionally compose Tailwind CSS classes.

```bash
npm install clsx
```

5. **Install rimraf**

We use [rimraf](https://www.npmjs.com/package/rimraf) to delete files and folders for cleanup purposes.

```bash
npm install rimraf --save-dev
```

6. **Install npm-run-all**

We use [npm-run-all](https://www.npmjs.com/package/npm-run-all) to run multiple npm scripts in parallel.

```bash
npm install npm-run-all --save-dev
```

7. **Reusable UI components**

BeeRich is scaffolded with a few reusable UI components. You can find them in the `app/components` folder. These will help us build the UI faster.

- Copy-paste the `app/components` folder from the root of this repository into your project.

8. **Existing routes**

BeeRich starts off with a few updates to the `app/root.tsx` and `app/routes/_index.tsx` files.

- Compare your `app/root.tsx` and `app/routes/_index.tsx` files with the ones in the root of this repository. Then copy-paste the changes into your project.

9. **The demo route**

BeeRich starts off with a demo route that showcases the UI components. You can find the demo route in the `app/routes/demo.tsx` file.

- Copy-paste the `app/routes/demo.tsx` file into your project.

To inspect the demo route, run `npm run dev` and visit the demo page at [http://localhost:3000/demo](http://localhost:3000/demo).

10. **Copy-paste the favicon.ico**

BeeRich uses a custom favicon. You can find the favicon in the `public/favicon.ico` file.

- Copy-paste the `public/favicon.ico` file into your project.

11. **Copy-paste the scripts**

Copy and replace the scripts in your `package.json` file with the following scripts:

```json
"scripts": {
  "routes": "remix routes",
  "typecheck": "tsc",
  "format": "run-s format:*",
  "format:lint": "eslint --fix --ext .js,.jsx,.ts,.tsx .",
  "clean": "rimraf ./node_modules .cache ./build ./public/build && npm i",
  "build": "run-s \"build:*\"",
  "build:remix": "remix build",
  "update:remix": "npm i @remix-run/express@2 @remix-run/node@2 @remix-run/react@2 @remix-run/dev@2 @remix-run/eslint-config@2 @remix-run/css-bundle@2",
  "dev": "run-p \"dev:*\"",
  "dev:remix": "remix dev --manual -c \"node server.js\"",
  "start": "cross-env NODE_ENV=production node ./server.js"
}
```

You can also find the scripts in the `package.json` file in the root of this repository [here](./package.json).

12. **Update the tsconfig.json file**

Add the following `compilerOptions` to your `tsconfig.json` file:

```json
  "module": "ES2022",
```

This is needed to make our seed script work, which we will add in _Chapter 5, Fetching and Mutating Data_.

Awesome! You are all set up. You can now start working on the chapter! 🥳

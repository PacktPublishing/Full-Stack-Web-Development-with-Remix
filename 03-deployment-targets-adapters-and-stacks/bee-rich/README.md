# BeeRich

## Getting started

**Welcome!** BeeRich is a dashboard-like application that mimics both personal and enterprise use cases. BeeRich is a personal finance management application that helps you stay on top of your beekeep - pardon me - bookkeeping. Well, at least that’s the goal. There is nothing much there yet. In every chapter, we will add more code to this application.

Starting with _Chapter 4, Routing in Remix_, there will be a `bee-rich/start` and `bee-rich/solution` folder in each chapter folder. Usually, you want to work on your local copy of BeeRich. However, if you get stuck, you can always refer to the `bee-rich/solution` folder to see the final code for the chapter and fallback to the `bee-rich/start` folder to reset the code to the starting point.

Each `bee-rich` folder contains a `README.md` file that contains a **Getting started** section (just like this one!). Additionally, there might be additional sections to help you get started with the chapter.

### Bootstrapping BeeRich

To get started with BeeRich, you can either copy-paste the BeeRich application from the chapter's `bee-rich/start` folder or you can use `create-remix` to bootstrap BeeRich.

#### BeeRich template

To bootstrap the base BeeRich application, run the following command:

```sh
npx create-remix@2 --template PacktPublishing/Full-Stack-Web-Development-with-Remix/03-deployment-targets-adapters-and-stacks/bee-rich
```

This uses the BeeRich template from _Chapter 3, Deployment Targets, Adapters, and Stacks_.

#### BeeRich chapter code

To bootstrap the BeeRich application for a specific chapter, run the following command:

```sh
npx create-remix@2 --template PacktPublishing/Full-Stack-Web-Development-with-Remix/:chapter-name/bee-rich/start
```

Replace `:chapter-name` with the name of the chapter. For example, to bootstrap the BeeRich application for _Chapter 4, Routing in Remix_, run the following command:

```sh
npx create-remix@2 --template PacktPublishing/Full-Stack-Web-Development-with-Remix/04-routing-in-remix/bee-rich/start
```

You can also replace `start` with `solution` to bootstrap the BeeRich application with the final code for the chapter.

### Run the application

To run the application, you need to install the dependencies and start the development server:

```sh
npm install
npm run dev
```

This will start the development server on port `3000`. You can now open the application in your browser at [http://localhost:3000](http://localhost:3000).

#### Chapter 5

Once we add the database in Chapter 5, you will need to run the following commands to set up the database and running the application:

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

#### Chapter 8

Once we add authentication in Chapter 8, you need to add a session secret to the `.env` file:

```text
DATABASE_URL="file:./dev.db"
SESSION_SECRET="[A secret string]"
```

### Dependencies

- [clsx](https://www.npmjs.com/package/clsx): A helper for constructing className strings conditionally.
- [tailwindcss](https://tailwindcss.com/): A utility-first CSS framework.

### Scripts

- `npm run routes` - prints the routes hierarchy
- `npm run format` - runs all the formatting scripts
- `npm run format:lint` - runs eslint and fixes errors
- `npm run clean` - deletes all generated files and folders and installs dependencies
- `npm run build` - runs all the build scripts
- `npm run build:css` - generates the CSS for production
- `npm run build:remix` - builds the Remix application
- `npm run update:remix` - update to the latest version of Remix
- `npm run dev` - runs all the dev scripts in parallel
- `npm run dev:css` - generates and watches the CSS for development
- `npm run dev:node` - runs the server in development mode
- `npm run dev:remix` - runs the Remix watcher
- `npm run generate:css` - runs the TailwindCSS script to generate the CSS file
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

If you want to set up BeeRich yourself, you can follow the following instructions.

1. **Use the Remix CLI to create a new Remix project**

```bash
npx create-remix@latest ./bee-rich
```

- Select [TypeScript](https://www.typescriptlang.org/) and the Express.js Server as your deployment target.

Please refer to _Chapter 2, Creating a new Remix app_ for more information about the `create-remix` script. You can also refer to the [REMIX_README.md](./REMIX_README.md) file for more information about how to work with Remix and the Express.js starter template.

2. **Set up Prettier and ESLint**

We use [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to format and lint our code.

- Install the following packages:

```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-html eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react
```

- Copy-paste the Prettier and ESLint configurations from the [.prettierrc](./.prettierrc.js) and [.eslintrc](./.eslintrc.js) files in the root of this repository into your project.

Please feel free to alter the Prettier configuration and add more ESLint packages and rules based on your own preferences.

- Copy-paste the [.vscode/settings.json](./.vscode/settings.json) file from the root of this repository into your project.

3. **Set up Tailwind CSS**

[Tailwind CSS](https://tailwindcss.com/) is a utility-first CSS framework. We will use Tailwind to compose powerful designs right in our markup.

- Please follow the instructions in the Remix documentation to set up [Tailwind CSS](https://remix.run/docs/en/v1/guides/styling#tailwind-css).
- Next, copy-paste the additional Tailwind CSS configuration from the [tailwind.config.js](./tailwind.config.js) file in the root of this repository into your project.
- Add the following line to the `/.gitignore` file:

```txt
/app/styles/tailwind.css
```

This prevents the generated Tailwind CSS file from being committed to your repository.

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

6. **Reusable UI components**

BeeRich is scaffolded with a few reusable UI components. You can find them in the `app/components` folder. These will help us build the UI faster.

- Copy-paste the `app/components` folder from the root of this repository into your project.

7. **Existing routes**

BeeRich starts off with a few updates to the `app/root.tsx` and `app/routes/index.tsx` files.

- Compare your `app/root.tsx` and `app/routes/index.tsx` files with the ones in the root of this repository. Then copy-paste the changes into your project.

8. **The demo route**

BeeRich starts off with a demo route that showcases the UI components. You can find the demo route in the `app/routes/demo.tsx` file.

- Copy-paste the `app/routes/demo.tsx` file into your project.

To inspect the demo route, run `npm run dev` and visit the demo page at [http://localhost:3000/demo](http://localhost:3000/demo).

9. **Copy-paste the favicon.ico**

BeeRich uses a custom favicon. You can find the favicon in the `public/favicon.ico` file.

- Copy-paste the `public/favicon.ico` file into your project.

Awesome! You are all set up. You can now start working on the chapter! 🥳

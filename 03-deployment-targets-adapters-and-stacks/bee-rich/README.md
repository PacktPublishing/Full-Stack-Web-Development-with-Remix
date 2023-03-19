# 3. Deployment Targets, Adapters, and Stacks

In this chapter, we will introduce you to BeeRich, the demo application used throughout this book. BeeRich is a simple personal finance app that allows you to track your expenses and income. Each chapter will add more features to BeeRich and focus on a specific topic.

## Getting started

**Welcome!** BeeRich is a dashboard-like application that mimics both personal and enterprise use cases. BeeRich is a personal finance management application that helps you stay on top of your beekeep - pardon me - bookkeeping. Well, at least that’s the goal. There is nothing much there yet. In every chapter, we will add more code to this application.

Every chapter has a dedicated folder in this repository. You will find one or several `README.md` files in each chapter's folder that contain instructions on how to get started with the chapter.

Starting with the next chapter, there will be a `bee-rich/start` and `bee-rich/solution` folder code for the chapter.

Each `bee-rich` folder contains a `README.md` file that contains a **Getting started** section (just like this one!). Additionally, there might be additional sections to help you get started with the chapter.

For this chapter, you can jump right into the book's content. However, if you want to explore the BeeRich application, you can find an overview of its dependencies, available scripts, and recommended VSCode settings below.

Also, if you want to set up BeeRich yourself, you can follow the instructions in the [Setting up BeeRich from scratch](#setting-up-beerich-from-scratch) section.

### Run the application

To run the application, you need to install the dependencies and start the development server:

```sh
npm install
npm run dev
```

This will start the development server on port `3000`. You can now open the application in your browser at [http://localhost:3000](http://localhost:3000).

### New dependencies

- [clsx](https://www.npmjs.com/package/clsx): A helper for constructing className strings conditionally.
- [tailwindcss](https://tailwindcss.com/): A utility-first CSS framework.

### New scripts

- `npm run routes` - prints the routes hierarchy
- `npm run format` - runs all the formatting scripts
- `npm run format:lint` - runs eslint and fixes errors
- `npm run clean` - deletes all generated files and folders and installs dependencies
- `npm run build:css` - generates the CSS for production
- `npm run build:remix` - builds the Remix application
- `npm run build` - runs all the build scripts
- `npm run dev:css` - generates and watches the CSS for development
- `npm run dev:node` - runs the server in development mode
- `npm run dev:remix` - runs the Remix watcher
- `npm run dev` - runs all the dev scripts in parallel
- `npm run generate:css` - runs the TailwindCSS script to generate the CSS file
- `npm run start` - runs the server in production mode

### Recommended VS Code settings and extensions

If you are using VS Code, we recommend installing the following extensions:

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Inspect the [`.vscode/settings.json`](./.vscode/extensions.json) file to see the recommended settings for VS Code. Feel free to alter these settings based on your own preferences.

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

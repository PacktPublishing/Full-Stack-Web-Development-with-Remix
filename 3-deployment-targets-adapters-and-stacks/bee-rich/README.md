# 3. Deployment Targets, Adapters, and Stacks

In this chapter, we will introduce you to BeeRich, the demo application used throughout this book. BeeRich is a simple personal finance app that allows you to track expenses and your income. Each chapter will add more features to BeeRich and focus on a specific topic.

## Getting started

**Welcome!** BeeRich is a dashboard-like application that mimics both personal and enterprise use cases. BeeRich is a personal finance management application that helps you stay on top of your bee - pardon me - bookkeeping. Well, at least that’s the goal. There is nothing much there yet. In every chapter, we will add more code to this application.

Every chapter has a dedicated folder in this repository. You will find a README.md file in each folder that contains instructions on how to get started. Starting with the next chapter, you will find a `start` folder in each chapter folder. This folder contains the code that you will start with. The `solution` folder contains the code that you will end up with.

You will find the following sections in each README.md file:

- **Getting started** - Instructions on how to get started with the code in the chapter.
- **Setting up** - Instructions that will help you get from the previous chapter's final code to the beginning of the current chapter.

Let's get started! Follow the instructions in _Chapter 3, Deployment Targets, Adapters, and Stacks_ to get started with BeeRich. You can also refer to the [REMIX_README.md](./REMIX_README.md) file for more information about how to work with Remix and the Express.js starter template.

### New Dependencies

- [clsx](https://www.npmjs.com/package/clsx): A helper for constructing className strings conditionally.
- [tailwindcss](https://tailwindcss.com/): A utility-first CSS framework.

### New Scripts

- `npm run routes` - prints the routes hierarchy
- `npm run format` - runs all the formatting scripts
- `npm run format:lint` - runs eslint and fixes errors
- `npm run build` - runs all the build scripts
- `npm run build:css` - generates the CSS for production
- `npm run build:remix` - builds the Remix application
- `npm run dev` - runs all the dev scripts in parallel
- `npm run dev:css` - generates and watches the CSS for development
- `npm run dev:node` - runs the server in development mode
- `npm run dev:remix` - runs the Remix watcher
- `npm run generate:css` - runs the TailwindCSS script to generate the CSS file
- `npm run start` - runs the server in production mode

## Setting up BeeRich

In case you want to start from scratch, you can follow the following steps to set up BeeRich yourself:

1. **Use the Remix CLI to create a new Remix project**

```bash
npx create-remix@latest ./bee-rich
```

- Select [TypeScript](https://www.typescriptlang.org/) and the Express.js Server as your deployment target.

Please refer to _Chapter 2, Creating a new Remix app_ for more information about the `create-remix` script.

2. **Set up Prettier and ESLint**

We use [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to format and lint our code.

- Install the following packages:

```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-html eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react
```

- Copy-paste the Prettier and ESLint configurations from the [.prettierrc](./.prettierrc.js) and [.eslintrc](./.eslintrc.js) files in the root of this repository into your project.

Please feel free to alter the Prettier configuration and add more ESLint packages and rules based on your own preferences.

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

5. **Reusable UI components**

BeeRich is scaffolded with a few reusable UI components. You can find them in the `app/components` folder. These will help us build the UI faster.

- Copy-paste the `app/components` folder from the root of this repository into your project.

6. **Existing routes**

BeeRich starts off with a few updates to the `app/root.tsx` and `app/routes/index.tsx` files.

- Compare your `app/root.tsx` and `app/routes/index.tsx` files with the ones in the root of this repository. Then copy-paste the changes into your project.

7. **The demo route**

BeeRich starts off with a demo route that showcases the UI components. You can find the demo route in the `app/routes/demo.tsx` file.

- Copy-paste the `app/routes/demo.tsx` file into your project.

To inspect the demo route, run `npm run dev` and visit the demo page at [http://localhost:3000/demo](http://localhost:3000/demo).

8. **Copy-paste the favicon.ico**

BeeRich uses a custom favicon. You can find the favicon in the `public/favicon.ico` file.

- Copy-paste the `public/favicon.ico` file into your project.

Awesome! You are all set up. You can now start working on the chapter! 🥳

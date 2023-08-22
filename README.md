# Full-Stack-Web-Development-with-Remix

Learn how Remix can supercharge your React development.

## Structure

The code for each chapter can be found in the corresponding folder. For example, `2-creating-a-new-remix-app` contains the code for _Chapter 2, Creating a new Remix App_.

Each chapter provides instructions for how to get started and how to incrementally reach the final code. The best starting point is the `README.md` file in each folder. The structure of each chapter may vary, but starting in [chapter 4](4-routing-in-remix/) you will typically find a `start` and a `solution` folder. The `start` folder contains the code that you will start with. The `solution` folder contains the code that you will end up with.

Sometimes the `README.md` file may include instructions from how to get from the previous chapter's final solution to the current chapter's starting point.

## Chapters

### Getting started with Remix

2.  [Creating a new Remix App](02-creating-a-new-remix-app/)
3.  [Deployment Targets, Adapters, and Stacks](03-deployment-targets-adapters-and-stacks)
4.  [Routing in Remix](04-routing-in-remix/)

### Working with Remix and the web platform

5.  [Fetching and Mutating Data](05-fetching-and-mutating-data/)
6.  [Enhancing the User Experience](06-enhancing-the-user-experience/)
7.  [Error Handling in Remix](07-error-handling-in-remix/)
8.  [Session Management](08-session-management/)
9.  [Assets and Meta Data Handling](09-assets-and-meta-data-handling/)
10. [Working with File Uploads](10-working-with-file-uploads/)

### Advanced topics of full stack web development with Remix

11. [Optimistic UI](11-optimistic-ui/)
12. [Caching Strategies](12-caching-strategies/)
13. [Deferring Loader Data](13-deferring-loader-data/)
14. [Real-Time with Remix](14-real-time-with-remix/)
15. [Advanced Session Management](15-advanced-session-management)

## BeeRich

In this book, we build a demo application called BeeRich. BeeRich is a dashboard-like expense and income tracking application. It is meant to
reflect a real-world application that you might build with Remix.

### Running BeeRich

Once we introduce BeeRich in chapter 3, we will gradually build it up in the following chapters. Each chapter contains a README file with instructions on how to get started and how to reach the final code.

To set up and run BeeRich, you will need to run the following commands:

```bash
npm install
npm run dev
```

Once we add the database in chapter 5, you will need to run the following commands to set up the database:

```bash
npm install
npm run build
npm run update:db
npm run dev
```

Always make sure to run these commands from the app's root folder. I recommend to open each Remix application you work on in a new VSCode window.

### Formatting & linting

BeeRich is set up with Prettier and ESLint.

Run `npm run format:lint` from the project's root to fix all lint and format violations.

You can also install the [ESLint VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to fix all lint and format violations on file save. For this, add the following settings to your workspace's user settings (./vscode/settings.json):

```json
"editor.formatOnSave": true,
"[javascript][javascriptreact][typescript][typescriptreact]": {
  "editor.formatOnSave": false
},
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
```

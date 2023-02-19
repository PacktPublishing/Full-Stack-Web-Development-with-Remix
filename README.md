# Full-Stack-Web-Development-with-Remix

Learn how Remix can supercharge your React development.

## Structure

The code for each chapter can be found in the corresponding folder. For example, `2-creating-a-new-remix-app` contains the code for _Chapter 2, Creating a new Remix App_.

Each chapter provides instructions for how to get started and how to incrementally reach the final code. The best starting point is the `README.md` file in each folder. The structure of each chapter may vary, but starting in [chapter 4](4-routing-in-remix/) you will typically find a `start` and a `solution` folder. The `start` folder contains the code that you will start with. The `solution` folder contains the code that you will end up with.

Sometimes the `README.md` file may include instructions from how to get from the previous chapter's final solution to the current chapter's starting point.

## Chapters

2. [Creating a new Remix App](2-creating-a-new-remix-app/)
3. [Deployment Targets, Adapters, and Stacks](3-deployment-targets-adapters-and-stacks)
4. [Routing in Remix](4-routing-in-remix/)
5. [Fetching and Mutating Data](5-fetching-and-mutating-data/)
6. [Enhancing the User Experience](6-enhancing-the-user-experience/)
7. [Error Handling in Remix](7-error-handling-in-remix/)
8. [Session Management](8-session-management/)
9. [Assets and Meta Data Handling](9-assets-and-meta-data-handling/)

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

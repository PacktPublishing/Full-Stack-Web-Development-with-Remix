# Full-Stack-Web-Development-with-Remix

Learn how Remix can supercharge your React development.

## Chapters

### Getting started with Remix

2.  [Creating a new Remix App](02-creating-a-new-remix-app)
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

## Structure

The code for each chapter can be found in the corresponding folder. For example, `02-creating-a-new-remix-app` contains the code for _Chapter 2, Creating a new Remix App_. Each chapter of the book provides instructions for how to get started and how to incrementally reach the final code of the chapter.

## BeeRich

BeeRich is a dashboard-like application that mimics both personal and enterprise use cases. BeeRich is a personal finance management application that helps you stay on top of your bee - pardon me - bookkeeping. Well, at least that’s the goal. In every chapter, we will add more code to this application.

We kick off the BeeRich development journey in _Chapter 3, Deployment Targets, Adapters, and Stacks_. You can find the BeeRich Remix template [here](/03-deployment-targets-adapters-and-stacks/bee-rich/).

### Getting started with BeeRich

Run the following command in a terminal to bootstrap the application:

```sh
npx create-remix@2 --template PacktPublishing/Full-Stack-Web-Development-with-Remix/03-deployment-targets-adapters-and-stacks/bee-rich
```

Follow the instructions in the terminal to create the application.

Note that the created application is nothing but a copy of the template from _Chapter 3, Deployment Targets, Adapters, and Stacks_. Refer to the `README.md` file in the bootstrapped application folder or [here](./03-deployment-targets-adapters-and-stacks/bee-rich/README.md) for more information about how to work with BeeRich.

## Troubleshooting and FAQ

### Application Error! How do I fix it?

If you see an **Application Error** while running the application, it is most likely that you missed a step in the instructions. Refer to the troubleshooting section in _Chapter 2, Creating a new Remix App_, for a step-by-step guide on how to debug issues in Remix. As always, read carefully through the error message and the stack trace to find the root cause of the issue.

#### Error: Environment variable not found: DATABASE_URL

1. Make sure to add an `.env` file to the root of your project. Refer to the `README.md` file of your current chapter. The _Run the application_ section contains the required environment variables for the application to run.
2. Restart your application after adding the `.env` file by running `npm run dev`. Environment variables are only loaded when the application starts.
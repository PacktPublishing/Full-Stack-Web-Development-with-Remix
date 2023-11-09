# Full Stack Web Development with Remix

<a href="https://www.packtpub.com/product/full-stack-web-development-with-remix/9781801075299"><img src="https://content.packt.com/B17399/cover_image_small.jpg" alt="" height="256px" align="right"></a>

This is the code repository for [Full Stack Web Development with Remix](https://www.packtpub.com/product/full-stack-web-development-with-remix/9781801075299), published by Packt.

**Enhance the user experience and build better React apps by utilizing the web platform**

## What is this book about?

We’re in an exciting era of web development marked by the rapid evolution of the JavaScript ecosystem. Remix offers the necessary abstractions to take advantage of the latest advancements in React and beyond. With this Remix book, you can elevate your skills from React development to full stack web development, unlocking the full potential of the latest technologies, such as edge functions, streaming, and the full stack of the web platform.

This book covers the following exciting features:

* Understand Remix’s philosophy and guiding principles.
* Enhance your web platform proficiency to make it applicable anywhere.
* Master data mutations, routing, error handling, and state management with Remix.
* Understand how to build web apps with accessibility and progressive enhancement in mind.
* Get acquainted with advanced topics such as caching strategies, optimistic UI, and real-time communication.
* Work with state-of-the-art technologies such as React Suspense and edge functions .
* Study migration patterns to move an existing project to Remix.

If you feel this book is for you, get your [copy](https://www.amazon.com/dp/1801075298) today!

<a href="https://www.packtpub.com/?utm_source=github&utm_medium=banner&utm_campaign=GitHubBanner"><img src="https://raw.githubusercontent.com/PacktPublishing/GitHub/master/GitHub.png" 
alt="https://www.packtpub.com/" border="5" /></a>

## Who is this book for?

This book is for React developers looking to adopt Remix for their next project. For those considering migrating to Remix, this guide offers a comprehensive walkthrough of building a full stack web app. To make the most of this book, beginner-level development experience with React and JavaScript is recommended. While having basic knowledge of server-side runtimes such as Node.js and experience with TypeScript can be beneficial, they are not mandatory prerequisites.

## Technical requirements

To follow along, you will need a computer that can run Node.js. All common operation systems should suffice. Please install both Node.js (version 18 or higher) and npm on your machine. An editor such as VS Code is recommended.

You can download Node.js and npm here: https://nodejs.org/en/download/.

## How to approach the content of the book?

We recommend having both a text editor and a terminal open while reading through each chapter. Follow the instructions in the text and try to reproduce the steps on your own machine. If you get stuck, you can always refer to the solutions in this repository.

## Structure

The code for each chapter can be found in the corresponding folder. For example, `02-creating-a-new-remix-app` contains the code for _Chapter 2, Creating a new Remix App_. Each chapter of the book provides instructions for how to get started and how to incrementally reach the final code of the chapter.

### Getting started with Remix

1. The Era of Full Stack Web Frameworks
2.  [Creating a New Remix App](02-creating-a-new-remix-app)
3.  [Deployment Targets, Adapters, and Stacks](03-deployment-targets-adapters-and-stacks)
4.  [Routing in Remix](04-routing-in-remix/)

### Working with Remix and the web platform

5.  [Fetching and Mutating Data](05-fetching-and-mutating-data/)
6.  [Enhancing the User Experience](06-enhancing-the-user-experience/)
7.  [Error Handling in Remix](07-error-handling-in-remix/)
8.  [Session Management](08-session-management/)
9.  [Assets and Metadata Handling](09-assets-and-meta-data-handling/)
10. [Working with File Uploads](10-working-with-file-uploads/)

### Advanced topics of full stack web development with Remix

11. [Optimistic UI](11-optimistic-ui/)
12. [Caching Strategies](12-caching-strategies/)
13. [Deferring Loader Data](13-deferring-loader-data/)
14. [Real-Time with Remix](14-real-time-with-remix/)
15. [Advanced Session Management](15-advanced-session-management)
16. Developing for the Edge
17. Migration and Upgrade Strategies

## BeeRich

BeeRich is a dashboard-like application that mimics both personal and enterprise use cases. BeeRich is a personal finance management application that helps you stay on top of your bee - pardon me - bookkeeping. Well, at least that’s the goal. In every chapter, we will add more code to this application.

We kick off the BeeRich development journey in _Chapter 3, Deployment Targets, Adapters, and Stacks_. You can find the BeeRich Remix template [here](/03-deployment-targets-adapters-and-stacks/bee-rich/).

## Troubleshooting and FAQ

Are you stuck, have a question, or want to report a bug? Please check for [open issues](https://github.com/PacktPublishing/Full-Stack-Web-Development-with-Remix/issues) or [open an issue](https://github.com/PacktPublishing/Full-Stack-Web-Development-with-Remix/issues/new/choose) in this repository. Plus, check out the FAQs below for quick answers.

### Why do some links in the book point to a outdated version of the Remix documentation?

Remix and its documentation are constantly evolving. Similarly to pinning code dependencies to specific versions to avoid unexpected breaking changes in code, we pin the links in the book to specific versions of the Remix documentation. Most links point to the latest version of the Remix documentation for v2 (`/2/`). Other links are pinned to a specific version (e.g., `/2.0.0/`, `/v1/`), for instance, if the content is likely to change in the future or not part of the latest version of the docs. Even though the links may seem outdated, we ensure all referenced content is relevant to the current version of Remix and your learning experience.

As always, you get the most out of the content of this book if you do additional research. Read through the referenced content of the documentation and then explore the latest version of the docs, as well. The more you familiarize yourself with the Remix documentation the better!

### Application Error! How do I fix it?

If you see an **Application Error** while running the application, it is most likely that you missed a step in the instructions. Refer to the troubleshooting section in _Chapter 2, Creating a new Remix App_, for a step-by-step guide on how to debug issues in Remix. As always, read carefully through the error message and the stack trace to find the root cause of the issue.

#### Error: Environment variable not found: DATABASE_URL

1. Make sure to add an `.env` file to the root of your project. Refer to the `README.md` file of your current chapter. The _Run the application_ section contains the required environment variables for the application to run.
2. Restart your application after adding the `.env` file by running `npm run dev`. Environment variables are only loaded when the application starts.

## Related products <Other books you may enjoy>

* Building Micro Frontends with React 18 [[Packt]](https://www.packtpub.com/product/building-micro-frontends-with-react-18/9781804610961) [[Amazon]](https://www.amazon.com/dp/1804610968)
* React 18 Design Patterns and Best Practices, 4e [[Packt]](https://www.packtpub.com/product/react-18-design-patterns-and-best-practices-fourth-edition/9781803233109) [[Amazon]](https://www.amazon.com/dp/1803233109)

## Get to Know the Author

**Andre Landgraf** is a full stack developer from Germany. He graduated with an MS in Information Systems from the Technical University of Munich and was also awarded an MS in Computer Science from Sofia University in Palo Alto. Andre currently lives in Cupertino, California, and he works as a Software Engineer at LinkedIn. Andre loves learning, writing, and speaking about all things web. In his free time, he tutors aspiring developers and builds for the web.

You can find Andre on [Twitter](https://twitter.com/AndreLandgraf94) and on [LinkedIn](https://www.linkedin.com/in/andre-landgraf/).


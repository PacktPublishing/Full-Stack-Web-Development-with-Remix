# Full Stack Web Development with Remix

<a href="https://www.packtpub.com/product/full-stack-web-development-with-remix/9781801075299"><img src="https://content.packt.com/B17399/cover_image_small.jpg" alt="" height="256px" align="right"></a>

This is the code repository for [Full Stack Web Development with Remix](https://www.packtpub.com/product/full-stack-web-development-with-remix/9781801075299), published by Packt.

**Enhance the user experience and build better React apps by utilizing the web platform**

## What is this book about?
We’re in an exciting era of web development marked by the rapid evolution of the JavaScript ecosystem. Remix offers the necessary abstractions to take advantage of the latest advancements in React and beyond. With this Remix book, you can elevate your skills from React development to full stack web development, unlocking the full potential of the latest technologies, such as edge functions, streaming, and the full stack of the web platform.

This book covers the following exciting features:
* Understand Remix’s philosophy and guiding principles
* Enhance your web platform proficiency to make it applicable anywhere
* Master data mutations, routing, error handling, and state management with Remix
* Understand how to build web apps with accessibility and progressive enhancement in mind
* Get acquainted with advanced topics such as caching strategies, real-time communication, and developing for the edge
* Work with state-of-the-art technologies such as edge computing, multi-regional databases, and Redis
* Study migration patterns to move an existing project to Remix

If you feel this book is for you, get your [copy](https://www.amazon.com/dp/1801075298) today!

<a href="https://www.packtpub.com/?utm_source=github&utm_medium=banner&utm_campaign=GitHubBanner"><img src="https://raw.githubusercontent.com/PacktPublishing/GitHub/master/GitHub.png" 
alt="https://www.packtpub.com/" border="5" /></a>


## Instructions and Navigations
All of the code is organized into folders. 

**Following is what you need for this book:**

This book is for React developers looking to adopt Remix for their next project. For those considering migrating to Remix, this guide offers a comprehensive walkthrough of building a full stack web app. To make the most of this book, beginner-level development experience with React and JavaScript is recommended. While having basic knowledge of server-side runtimes such as Node.js and experience with TypeScript can be beneficial, they are not mandatory prerequisites.

With the following software and hardware list you can run all code files present in the book (Chapter 1-17).

### Software and Hardware List

| Chapter  | Software required                             | OS required                        |
| -------- | ----------------------------------------------| -----------------------------------|
| 1-17     | IDE - Visual Studio Code or Android Studio    | Windows, Mac OS X, and Linux (Any) |
| 1-17     | Node.js    | Windows, Mac OS X, and Linux (Any) |

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

After following the instructions in the terminal, navigate to the newly created project folder and open the `README.md` file for further instructions.

### Later versions of BeeRich

Each chapter iterates on the previous one. If you want to check out a later version of BeeRich, you can find a `start/` and `solution/` version of BeeRich in each chapter folder. 

First, clone this repository:

```sh
https://github.com/PacktPublishing/Full-Stack-Web-Development-with-Remix.git
```

Then, open the `start/` or `solution/` folder in your editor and review the `README.md` file for further instructions.

## Troubleshooting and FAQ

### Application Error! How do I fix it?

If you see an **Application Error** while running the application, it is most likely that you missed a step in the instructions. Refer to the troubleshooting section in _Chapter 2, Creating a new Remix App_, for a step-by-step guide on how to debug issues in Remix. As always, read carefully through the error message and the stack trace to find the root cause of the issue.

#### Error: Environment variable not found: DATABASE_URL

1. Make sure to add an `.env` file to the root of your project. Refer to the `README.md` file of your current chapter. The _Run the application_ section contains the required environment variables for the application to run.
2. Restart your application after adding the `.env` file by running `npm run dev`. Environment variables are only loaded when the application starts.


### Related products <Other books you may enjoy>
* Building Micro Frontends with React 18 [[Packt]](https://www.packtpub.com/product/building-micro-frontends-with-react-18/9781804610961) [[Amazon]](https://www.amazon.com/dp/1804610968)

* React 18 Design Patterns and Best Practices, 4e [[Packt]](https://www.packtpub.com/product/react-18-design-patterns-and-best-practices-fourth-edition/9781803233109) [[Amazon]](https://www.amazon.com/dp/1803233109)

## Get to Know the Author
**Andre Landgraf**
is a full stack developer from Germany. He graduated with an MS in Information Systems from the Technical University of Munich and was also awarded an MS in Computer Science from Sofia University in Palo Alto. Andre currently lives in Cupertino, California, and he works as a Software Engineer at LinkedIn. Andre loves learning, writing, and speaking about all things web. In his free time, he tutors aspiring developers and builds for the web.

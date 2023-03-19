---
title: "The Quil tech stack"
datePublished: Fri Apr 23 2021 16:11:08 GMT+0000 (Coordinated Universal Time)
cuid: cknuiglh40d23ass14dh65tsd
slug: the-quil-tech-stack
tags: aws, technology, typescript, terraform

---

Here at [Quil](https://getquil.com/)\[1\], we are working on a financial safety net for everybody. Earlier this year, the development team broke ground on our application that will bring this vision to life. We wanted to share some details with the world about how we are building Quil.

Greenfield projects are thrilling and terrifying for the same reason: you can do *anything*, and you must decide how to do *everything!* Though we never formally defined any #goals for the project, we all agreed on a few common principles to guide our decisions:

1. Simplify configuration
    
2. Reduce cognitive load
    
3. Expect scale and complexity to grow
    
4. Implement secure practices by default
    
5. Focus on delivering the simplest MVP possible
    

With those in mind, let's talk about some nuts and bolts of our application.

* [Language](#language)
    
* [Architecture and infrastructure](#architecture-and-infrastructure)
    
* [Code organization](#code-organization)
    
* [Testing](#testing)
    
* [CI](#ci)
    
* [Learning experiences](#learning-experiences)
    
* [Closing thoughts](#closing-thoughts)
    

# Language

TypeScript, top to bottom.

The development team has a background in several different languages, and we considered several approaches. In the end, our decision to land on TypeScript was informed by:

1. Ability to share developer resources between frontend and backend. As with many startups, our team is relatively slim so removing functional silos is paramount.
    
2. Ability to share code between frontend, backend, future microservices, and serverless functions. This has proved to be extremely valuable and made our codebase highly flexible.
    
3. Type safety. Our development team has backgrounds in both "untyped" scripting languages (Ruby, JavaScript) and strictly typed, compiled languages (Scala, Kotlin). We felt TypeScript provided a great middle-ground by adding compile-time type checks and improved developer tooling, while reducing complexity to maintain a fast development pace.
    
4. No limits. TypeScript (and by extension, JavaScript) can run anywhere we need to run code, so we knew wouldn't run into barriers due to runtime requirements.
    

We'll talk a bit more about the benefits gained from TypeScript in both the [Architecture and infrastructure](#architecture-and-infrastructure) and [Code organization](#code-organization) sections. In short, using TypeScript everywhere has saved us time and energy, and allowed us to be highly agile when swarming on features.

# Architecture and infrastructure

![What if I told you the cloud is just someone else's computer](https://www.techrepublic.com/a/hub/i/2017/03/23/e9249908-d3e2-4ae0-bda8-40f2f11bc692/c6gpmznwmaqhwi.jpg align="left")

Our MVP architecture, in a nutshell, is:

* Progressive Web App (PWA)
    
* Monolith GraphQL API
    
* AWS Lambdas for asynchronous tasks and scheduled jobs
    
* Amazon Aurora relational database
    

We recognized that our MVP architecture would likely need adjustments in the future. For example, we spent a lot of time debating between monolith and microservice architecture, but decided that a monolith would improve our time-to-market substantially. The tradeoff we made internally was to structure our code in the most modular and loosely-coupled way possible, to benefit our future selves when we likely break apart the monolith into microservices (read more about that in the [Code organization](#code-organization) section).

We also know that we'll eventually add native clients to our stack. However, we decided with our product team that a PWA was a sufficient trade-off for the MVP because it delivers near-native cross-platform experience in a fraction of the development time.

TypeScript was a natural fit for every layer of our stack. Other than the obvious Web App, we knew that Node has great performance for AWS Lambdas. GraphQL is another great fit, as the reference implementation for a GraphQL server is written in JavaScript. Interfacing with non-JS resources like the database is easy thanks to the huge TS/JS ecosystem.

## Infrastructure

![On my way to update the servers config](https://cdn.hashnode.com/res/hashnode/image/upload/v1619125938151/s9CFF5lm0.jpeg align="left")

We are using AWS for our infrastructure, and Terraform to implement our infrastructure-as-code. Our team had previous experience with Terraform so it was a natural fit, and we knew that infrastructure-as-code would be important as we scaled up to manage additional environments. One of the best features of Terraform is its ability to modularize infrastructure. Two modules we created that have been extremely useful for us are an SQS-driven lambda, and an EventBridge-driven lambda. Having modules for this infrastructure makes it extremely easy to create a new lambdas in no time, while adhering to our own established patterns.

Some of our choices for specific infrastructure were guided by the principles I mentioned earlier. For example, we know up front that we should expect scale to grow. For that reason, we chose to use as many auto-managed services as possible. ECS Fargate instances and Amazon Aurora provide the same containerized infrastructure and relational database that we're used to, but with less time spent managing individual resources and more time writing code that matters to our users.

We chose Amazon Aurora as our primary database because relational databases make more sense for the vast majority of web applications. We will likely utilize Amazon DynamoDB for some of our larger-scale, non-relational data storage such as our ledger, but relational databases made much more sense for our core product.

# Code organization

![The cookies are inside the computer? So simple!](https://memegenerator.net/img/instances/65524002/the-cookies-are-inside-the-computer-its-so-simple.jpg align="left")

Even in the planning phase, we had already identified several distinct pieces of our application that we needed: Web app, API, lambdas, infrastructure, and shared libraries. We knew the simplest solution would be discrete repositories for each piece of the app, but we were also interested in maximizing some of the benefits of TypeScript that we identified previously, such as sharing code, increasing collaboration, and reducing cognitive load for the development team.

We decided to use a monorepo configuration with [Nx](https://nx.dev/) as a management layer for our apps and libraries. This has turned out to be one of the best decisions we made as it provided several concrete benefits:

1. Nx eliminates most manual configuration by including configurations for all the industry-standard tooling: TypeScript, ESLint, Jest, Prettier, as well as application libraries like React, Storybook, and Express. This ended up being a huge time saver
    
2. Nx encourages modularity in the code by making it dead simple to generate new libraries with a simple CLI command. In addition, importing internal libraries is as easy as a reference; by utilizing TypeScript's [path aliases](https://dev.to/larswaechter/path-aliases-with-typescript-in-nodejs-4353) we are able to share code between discrete applications without needing to publish libraries to an authorized repository.
    
3. CI is easier to configure because we can ensure that changes to shared libraries trigger tests and builds for *all* affected applications. In addition, end-to-end tests are dead simple to configure because they live next to the application code, but are logically distinct as a separate application.
    

[Nx](https://nx.dev/) has been a pleasure to use and we would recommend it for any new projects. Even a project that only has a single application could benefit from it's zero-thought-required setup and configuration. The monorepo also serves to reduce cognitive load by having one source of truth for everything.

# Testing

![I don't always use Internet Explorer, but when I do it's usually to download a better browser](https://cdn.hashnode.com/res/hashnode/image/upload/v1619125952400/RtkloYEbN.webp align="left")

Unsurprisingly, we are using Jest as our primary test runner, which comes configured out of the box with TypeScript and React thanks to Nx.

The vast majority of our tests are integration tests. For our backend code, that means we run tests against an in-memory server and an in-memory database. While this does add to execution time, it also greatly increases the efficacy of each test we write. Using in-memory resources instead of deployed/hosted resources means that we can ensure clean data for every test, without worrying about overlapping test runs on shared infrastructure.

We also use Jest for our web-app testing, where we tend to write tests that exercise full user flows, as opposed to checking render snapshots of isolated values. Of course, neither of these testing strategies are full substitutes for end-to-end (E2E) tests.

## Web app E2E testing

For our web app E2E tests we use Cypress, which is conveniently configured and installed thanks to Nx. Currently we run our Cypress tests against a local development server which makes our tests flexible enough to run anywhere (see [CI](#ci) for more details on where we run our tests).

## API E2E testing

Our API E2E tests live in the same monorepo as our API but are kept in a separate application from the main API source code. This forces our E2E tests to take a black-box approach since they cannot access the API internals, but since the code exists in the same repo it makes it extremely easy to execute our E2E tests in our [CI](#ci) workflow.

# CI

![When your alphabet soup is password protected](https://www.terminalbytes.com/wp-content/uploads/2021/03/dckee6z4xpp61.png align="left")

We use GitHub Actions for all our CI needs. GitHub Actions is a great combination of powerful and flexible, and the strong community of actions makes it easy to plug in any behavior we need.

For most of our CI needs we use [GitHub-hosted runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners) to check formatting, lint, build, test, and deploy our software.

However, our API E2E tests require us to have a static IP address for integration with some of our partners. For this, we run a [self-hosted runner](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners) in an ECS Fargate service. Using GitHub-hosted runners for the majority of our CI work load saves cost and reduces maintenance, but the flexibility to have our own runners is a huge benefit for our CI flow.

# Learning experiences

![Is there documentation?](https://www.terminalbytes.com/wp-content/uploads/2021/04/4nub7lygkyr61.png align="left")

As with any project, there are always opportunities for improvement.

One choice that ended up costing us some time was our choice of ORM. After using a shiny new ORM for a couple months of development, we realized that some of its features and release stability didn't meet our needs. We ended up switching to [Sequelize](https://sequelize.org/) and have been very happy with it, but the cost of switching ORMs in the middle of development was not ideal. Lesson learned: consider key library and framework decisions carefully.

Another important learning experience has been finding the right balance of documentation. Of course, with new projects you don't want to **over** document, because things change rapidly. But, maintaining documentation for your team is critical to disseminate information as quickly as possible too. Lesson learned: accept the cost of writing (and occasionally re-writing) documentation as necessary to help the team be more aligned and more cohesive.

# Closing thoughts

We hope you enjoyed this sneak peak into the Quil application! Please reach out with any questions or comments, and sign up for updates at [getquil.com](http://getquil.com) to be first in line when Quil is released!

### Footnotes

\[1\] Quil used to be called Quin
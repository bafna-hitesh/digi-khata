# Turborepo starter

This is an official starter Turborepo.

## Rules of Thumb

https://wou.edu/las/cs/csclasses/cs161/Lectures/rulesofthumb.html

- DRY (Don't Repeat Yourself):
  This principle emphasizes the importance of avoiding duplication in code. Every piece of knowledge or logic should be represented in a single place in a system. If you find yourself writing the same code over and over again, it's often a sign that you should abstract this code into a single function or module. This makes the code easier to maintain, understand, and reduces the potential for errors.

- KISS (Keep It Simple, Stupid):
  KISS advises against unnecessary complexity in code. It suggests that systems work best if they are kept simple rather than made complicated; therefore, simplicity should be a key goal in design, and unnecessary complexity should be avoided. This principle is often cited as a counterbalance to the urge to over-engineer solutions to problems.

- YAGNI (You Aren't Gonna Need It):
  This principle is a mantra from Extreme Programming that encourages developers not to add functionality until it is necessary. It discourages work on features or functionalities which are not currently needed, on the premise that they may not be needed ever. This is closely related to the concept of "minimum viable product" (MVP) in product development.

- Separation of Concerns:
  This principle involves separating a computer program into distinct sections, such that each section addresses a separate concern. It's a design principle for separating a computer program into distinct sections, where each section addresses a specific concern. A concern is a set of information that affects the code of a program. This approach simplifies development and maintenance of the software.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:
abcd

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

<!-- "postinstall": "chmod +x ./apps/services/servers/dashboardMs/install_dependencies.sh && ./apps/services/servers/dashboardMs/install_dependencies.sh", -->

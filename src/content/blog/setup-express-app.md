---
title: Setup an Express App with Typescript
description: A Simple Guide for Setting up an Express App with TypeScript.
date: 2023-09-15T10:00:35Z
tags:
  - boilerplate
  - node
  - express
  - typescript
---

This post will explain how to setup up a basic hello world express app with typescript, we will be using pnpm as the package manager.

## Table of contents

## Basic Project Setup

### Initialize the Project

Initialize the folder as a pnpm project

```bash frame="none"
pnpm init
```

### Installing Packages

Install typescript and type declarations for node as dev dependencies.

```bash frame="none"
pnpm i -D typescript @types/node
pnpm i -D tsx
```

Install TSX as the typescript runner.

```bash frame="none"
pnpm i -D tsx
```

Install Express with it's typings.

```bash frame="none"
pnpm i express
pnpm i -D @types/express
```

### Configuring Typescript

We will be using ESM (ECMA Script Module) syntax.So, we need to add `"type": "module"` to package.json

```json title="package.json" {4}
{
	"name": "express-app",
	"version": "1.0.0",
	"type": "module"
	...
}
```

Then add a tsconfig.json file to the root of project

```json title="tsconfig.json"
{
  "compilerOptions": {
    "strict": true,
    "module": "ESNext",
    "target": "ESNext",
    "moduleResolution": "Bundler",
    "moduleDetection": "force",
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src", "scripts"]
}
```

You can use your own tsconfig.json file or checkout a cool repo called [bases](https://github.com/tsconfig/bases/).

### Loading Env Variables

We will be using `dotenv` for loading variables from .env file, and `zod` for parsing and validating the env variables.

```bash frame="none"
pnpm i dotenv zod
```

Creating a file to load ENV variables.

```ts title="src/env.ts"
import "dotenv/config";
import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().default(8080),
});

export default envSchema.parse(process.env);
```

This will load env variable a `.env` file which looks something like this,

```properties title=".env"
PORT = 3000
```

## Writing the Server

This is a basic hello world server. We are importing PORT from this `env.ts` file we just made.

```ts title="src/index.ts"
import express from "express";
import env from "./env";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(env.PORT, () => {
  console.log(`Listening on http://localhost:${env.PORT}`);
});
```

Now, we can use `tsx` to run typescript file directly without manual transpilation.

```bash frame="none"
pnpm tsx src/index.ts
```

## Building the Project (OPTIONAL)

We can use tools like `esbuild` to bundle the entire code to a single js file, which we can run directly with Node.

```bash frame="none"
pnpm i esbuild
```

Then setting up a custom build script to bundle `.ts` files with ESM syntax to `.mjs` file with ESM Syntax. We also need toi include a custom header for now because of an issue with esbuild.

```ts title="scripts/build.ts" {14-20}
import { build, BuildOptions } from "esbuild";

const config = {
  entryPoints: ["src/index.ts"],
  outdir: "./dist",
  format: "esm",
  outExtension: {
    ".js": ".mjs",
  },
  platform: "node",
  bundle: true,
  minify: true,
  sourcemap: false,
  banner: {
    js: `
    const require = (await import("node:module")).createRequire(import.meta.url);
    const __filename = (await import("node:url")).fileURLToPath(import.meta.url);
    const __dirname = (await import("node:path")).dirname(__filename);
    `,
  },
} satisfies BuildOptions;

try {
  await build(config);
  console.log("⚡️ Build success");
  process.exit(0);
} catch (e) {
  console.log("☠️ Build failed");
  process.exit(1);
}
```

For compiling the source code use the command below. This will create a dist folder with `index.mjs` file in it.

```bash frame="none"
pnpm tsx scripts/build.ts
```

After compiling everything to a single file we can run it like this,

```bash frame="none"
node dist/index.mjs
```

It doesn't even need any of the external dependencies to be installed, which is super cool 😎

## Project Links

- Repo: [https://github.com/tanishqmanuja/boilerplate.express](https://github.com/tanishqmanuja/boilerplate.express)

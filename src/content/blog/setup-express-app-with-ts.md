---
title: Setup an Express App with Typescript
description: How to setup up a boilerplater express app with typescript
date: 2023-09-15T10:00:35Z
tags:
  - node
  - express
  - typescript
---

This post will explain how to setup up a boilerplater express app with typescript, we will be using pnpm as the package manager.

## Table of contents

## Steps

### 1. Init

Initialize the folder as a pnpm project

```bash frame="none"
pnpm init
```

### 2. Install Packages

- Install typescript and tsx

```bash frame="none"
pnpm install -D typescript
pnpm install -D tsx
```

- Install @types essential packages

```bash frame="none"
pnpm install -D @types/node
```

- Install Express with it's typings

```bash frame="none"
pnpm install express
pnpm install -D @types/express
```

> [!note]
> '-D' flag for developer dependencies

> [!tip]
> 'install' can be replaced with 'i' or 'add' when using pnpm

### 3. Setup Typescript

Since we are using ESM (ECMA Script Module) we need to add `"type": "module"` to package.json

```json title="package.json" {4}
{
	"name": "example-package",
	"version": "1.0.0",
	"type": "module"
	...
}
```

and add a tsconfig.json file to the root of project

```json title="tsconfig.json"
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "moduleDetection": "force",
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

### 4. Running ".ts" files

Using tsx to run typescript file directly without manual transpilation.

```bash frame="none"
pnpm tsx src/index.ts
```
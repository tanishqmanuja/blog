---
title: Getting Started with Drizzle ORM, MySQL & Typescript
description: Learn the Basics of Drizzle ORM, MySQL, and Typescript in this Getting Started Guide
date: 2023-09-16T09:00:35Z
tags:
  - boilerplate
  - node
  - drizzle
  - mysql
---

[Drizzle](https://orm.drizzle.team/) is a lightweight, type-safe ORM which supports a variety database drivers out of the box! It's type-safety will make your dev experience 100x better with the power of code completions and intellisense build into modern editors.

## Table of contents

## Before We Start

In this post we will be using pnpm as the preferred package manager and mysql2 as the db driver. You can choose these differently according to your needs.

Also, it is assumed that you have a working typescript environment at your disposal before starting with drizzle setup.

Here's the basic tsconfig we will be using for this project. Two things to watch for are the path aliases and the include folders.

```json title="tsconfig.json" {12,15}
{
  "compilerOptions": {
    "strict": true,
    "module": "ESNext",
    "target": "ESNext",
    "moduleResolution": "Bundler",
    "moduleDetection": "force",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  },
  "include": ["src", "scripts"]
}
```

## Steps to Follow

### Installing Dependencies

Install `drizzle-orm` and the driver package for preferred database dialect, which is `mysql2` for mysql. Then install `drizzle-kit` as a dev-dependency.

```bash frame="none"
pnpm i drizzle-orm mysql2
pnpm i -D drizzle-kit
```

Install `dotenv` for loading .env files & `zod` for env validation and typings. \
This step is OPTIONAL but if you skip this step you will have to handle ENV Variables on your own.

```bash frame="none"
pnpm i dotenv zod
```

### Setting up ENV Variables

We will export all parsed ENV vars from a single file called env.ts

```ts title="src/env.ts"
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DB_URI: z.string().regex(new RegExp("mysql://.*")),
});

export default envSchema.parse(process.env);
```

> [!tip]
> URI Format for mysql is as follows:
> mysql://${username}:${password}@${host}:${port}/${db_name}

### Writing Table Schemas

There are many ways of structuring our schema files. For this post we will use the approach that will help us easily integrate into drizzle migrations and db queries functionality with full type-safety. You can read about other approaches [here](https://orm.drizzle.team/docs/sql-schema-declaration).

We will store all the schema files inside `src/db/schema` folder and then export then with a barrel file. For example:

```ts title="sc/db/schema/users.ts"
import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});
```

and the barrel file,

```ts title="sc/db/schema/index.ts"
/* THIS IS A BARREL FILE FOR ALL SCHEMA INSIDE THIS FOLDER */

/* Using barrel files is considered an anti-pattern,
 * It can interfere with tree shaking and might increase bundle size,
 * Import from this file only if you really need it !
 */

export * from "./users";
```

### Database Client

This client will be used to perform operations on our db with full type-safety.

```ts title="src/db/index.ts"
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import env from "~/env";

import * as schema from "./schema";

const connection = await mysql.createConnection({
  uri: env.DB_URI,
});

export default drizzle(connection, { mode: "default", schema });
```

This is why we needed a barrel file, Because the drizzle function expects a schema value to provide type completions when using db.query for something like this.

```ts frame="none"
db.query.users.findMany();
```

### Handling Migrations

For generating migrations we need to first setup a drizzle.config.ts file at the root of our project.

```ts title="drizzle.config.ts"
import type { Config } from "drizzle-kit";
import env from "./src/env";

export default {
  dbCredentials: { connectionString: env.DB_URI },
  schema: "./src/db/schema/index.ts",
  driver: "mysql2",
  breakpoints: true,
  out: "./drizzle",
} satisfies Config;
```

We can use the following command to generate the migrations.

```sh frame="none"
pnpm drizzle-kit generate:mysql
```

Then we need to write a custom script to call the migration function for mysql2.

```ts title="scripts/migrate.ts"
import { migrate } from "drizzle-orm/mysql2/migrator";
import config from "../drizzle.config";
import db from "~/db";

migrate(db, { migrationsFolder: config.out })
  .then(() => {
    console.log("Migration Done!");
    process.exit(0);
  })
  .catch(err => {
    console.log("Migration Failed :(");
    console.log(err);
    process.exit(1);
  });
```

Finally, we can use the following command to apply the migrations to our database.

```sh frame="none"
pnpm tsx scripts/migrate.ts
```

> You can install `tsx` as a dev dependency to run typescript files directly.

## Useful Package JSON Script

drizzle-kit provides much more functionality then what we just used. Still I am sharing a snippet of what my package.json commonly looks in a drizzle project.

```json title="package.json" {4-10}
{
  /* Common Stuff */
  "scripts": {
    "db:generate": "drizzle-kit generate:mysql",
    "db:migrate": "tsc scripts/migrate.ts",
    "db:check": "drizzle-kit check:mysql",
    "db:pull": "drizzle-kit introspect:mysql",
    "db:push": "drizzle-kit push:mysql",
    "db:drop": "drizzle-kit drop:mysql",
    "db:view": "drizzle-kit studio --host 127.0.0.1"
  }
  /* Dependencies */
}
```

## Project Links

- Repo: [https://github.com/tanishqmanuja/boilerplate.drizzle-mysql-node](https://github.com/tanishqmanuja/boilerplate.drizzle-mysql-node)

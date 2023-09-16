---
title: Setup Drizzle ORM with MySQL database
description: How to setup up boilerplater code for using drizzle orm with mysql in nodejs
date: 2023-09-16T04:10:35Z
tags:
  - node
  - drizzle
  - mysql
---

This post will explain how to use drizzle orm with mysql db in a nodejs app.

## Table of contents

## Steps

### 1. Install drizzle

```bash
pnpm add drizzle-orm mysql2
pnpm add -D drizzle-kit
```

### 2. Setup DB Connection

```ts
// file: src/db/db.ts

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "192.168.0.12",
  port: 3306,
  user: "mrstark",
  password: "tm",
  database: "db",
});

export const db = drizzle(connection);
```

> [!tip]
> URI Format for mysql is as follows:
> mysql://${username}:${password}@${host}:${port}/${db_name}

### 3. Make Schema(s)

Make single or multiple schema(s) for example:

```ts title="src/db/schema/users.ts"
import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});
```

### 4. Generate Migrations

```ts title="drizzle.config.ts"
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/*",
  out: "./.drizzle",
  breakpoints: true,
} satisfies Config;
```

Command:

```bash
pnpm drizzle-kit generate:mysql
```

### 5. Use Migrations in SQL

```ts title="src/migrate.ts"
import { migrate } from "drizzle-orm/mysql2/migrator";
import { db } from "./db/db";

migrate(db, { migrationsFolder: "drizzle" })
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

Command:

```bash
pnpm tsx src/migrate.ts
```

## Sample Operations

### Insert

```ts title="src/test/insert.ts"
import { db } from "./db/db";
import { users } from "./db/schema/users";

await db.insert(users).values({
  username: "ghost",
});
```

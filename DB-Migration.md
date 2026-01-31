# What Is a DB Migration?
A migration is:

A version-controlled way to change your database schema safely.

Instead of:

Manually running SQL ❌

Forgetting what changed ❌

Breaking prod ❌

You get:

Ordered files

Repeatable changes

Same DB structure everywhere

```
Code version 1 → Migration 001 → DB shape v1
Code version 2 → Migration 002 → DB shape v2
```

# Steps
## Step 1: Install Migration Tool
`npm install node-pg-migrate`

## Step2: Add migration script to package.json
```
"scripts": {
  "start": "node index.js",
  "migrate": "node-pg-migrate up"
}
```
## Step3: Configure DB connection for migration
```
{
  "defaultEnv": {
    "host": "db",
    "user": "postgres",
    "password": "postgres",
    "database": "myapp",
    "port": 5432
  }
}

📌 db = Docker Compose service name
📌 Same internal network Node already uses
```

## Step4: create first migration
`npx node-pg-migrate create create_users_table`
- this create file `migrations/168xxxxx_create_users_table.js`
- replace the content inside with:
```
exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    email: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },
    created_at: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};

```
up → apply change

down → rollback change
## Step5: run migration inside docker setup
- Because DB is in Docker, run migrations inside the backend container.
`docker-compose exec backend npm run migrate`
- Expected:
```
Migrating files:
> ... create_users_table
```
DB schema now exists.
## Step6: Verify
Connect to DB container::
`docker-compose exec db psql -U postgres -d myapp`
Then:
`\dt`
exit:
`\q`
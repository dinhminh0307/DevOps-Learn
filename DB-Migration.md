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

## Bugs and Issue tips
### Docker Compose containers not auto-starting
- Even with restart: always, the containers won't start if Docker Compose isn't running the services. You have two main options:
- Create a systemd service to manage your Docker Compose stack:
```
[Unit]
Description=Docker Compose Application Service
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/ubuntu/DevOps-Learn/node-backend-sample
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```
- Copy the systemd service file to your EC2 instance:
`sudo cp /path/to/docker-compose-app.service /etc/systemd/system/`
- Enable and start the service:
```
sudo systemctl daemon-reload
sudo systemctl enable docker-compose-app.service
sudo systemctl start docker-compose-app.service
```
- check status
`sudo systemctl status docker-compose-app.service`
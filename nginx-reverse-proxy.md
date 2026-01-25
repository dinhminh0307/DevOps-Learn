# What is Nginx:
Nginx is a traffic manager for your server.

It sits in front of your app and handles:

Incoming web requests

Ports (80 / 443)

Routing traffic to the right app

Performance & security basics

Your Node.js app:

Focuses on business logic

Should NOT deal with raw internet traffic

# What Is Port 80?
Port 80 is the default web port.

That means:

http://example.com → automatically uses port 80

No :3000 needed

So:

Browsers expect port 80

APIs & users expect port 80

# What Is a Reverse Proxy?
A proxy = a middleman.

Reverse Proxy (Plain English)

A reverse proxy:

Receives requests from users

Forwards them to your backend app

Sends responses back to users

Users never talk directly to your Node app.

- Visual Flow:
```
User
  ↓
Nginx (port 80)
  ↓
Node.js app (port 3000)
```

# SetUp Reverse proxy with nginx:
## Install Nginx
- One EC2 SSH:
```
sudo apt update
sudo apt install -y nginx
```
- Check status: `sudo systemctl status nginx`
## Test Nginx
- open browser: `http://<PUBLIC-IP>`
- You should see:

“Welcome to nginx!”

✅ This confirms:

Port 80 is open

Nginx is receiving traffic

Security group is correct

## Make sure Node app is running
## Configure Nginx as reverse proxy
- Open Default config file:
`sudo nano /etc/nginx/sites-available/default`
- replace with:
```
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;

        proxy_cache_bypass $http_upgrade;
    }
}
```
- It mean “Listen on port 80.
When a request comes in, forward it to my Node.js app on port 3000, and send the response back to the user.”
- Tips to select all and delete in nano file: `https://superuser.com/questions/196425/how-do-i-select-all-text-from-a-file-with-nano`
## Test Nginx Configuration
`sudo nginx -t`
- Reload Nginx (do this everytime nginx setting change):
`sudo systemctl reload nginx`
## FInal test:
http://<PUBLIC-IP>
http://<PUBLIC-IP>/health
http://<PUBLIC-IP>/api/time

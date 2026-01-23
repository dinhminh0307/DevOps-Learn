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
## Create EC2 instance:
- Choose the server, host machine
- generate key pem (To connect ssh to the server)
- add security group:
```
- SSH: 22 source myIP (to allow the current admin can SSH to the server)
- TCP: 3000 source anywhere (Since the backend code is running on port 3000, allow TCP to visible it to internet)
- HTTP: 80 anywhere (mapping port 3000 to port 80 so that can be connect via http)
```
- laubch instance
- get IPV4 public

## Connect to SSH
- Go to the current location containing the key pem
- Remove the inherited permissions:
`icacls node-backend-key.pem /inheritance:r`
- grant permission to the window user:
`icacls node-backend-key.pem /grant:r %USERNAME%:R`
- connect to ssh:
`ssh -i node-backend-key.pem ubuntu@<PUBLIC-IP>`

## Install Nodejs/ or any environment for the backend code in the EC2 server
## Install Git and connect to the Git to clone the backend project in EC2 Server
## Run the app and access via http://PUBLIC_IP_V4:PORT:
- When you run:
`npm start`
- Your Node.js app runs in the foreground.

### That means:

- The app is tied to your SSH session

If you:

- Close the terminal ❌

- Lose internet ❌

- Log out ❌

- 👉 The app stops

- This is fine for testing, not OK for real servers.

### Use PM2 (process manager to keep running )
PM2:

Runs your app in the background

Restarts it if it crashes

Can auto-start on server reboot

Shows logs & status

- Start app with PM2:
`pm2 start index.js --name node-backend`
- You should see:
`[PM2] App [node-backend] launched`
- Check status: `pm2 status`

### Auto-Start on Server Reboot
- When run `pm2 startup`
- it will print cli: `sudo env PATH=... pm2 startup systemd -u ubuntu --hp /home/ubuntu`
- Copy & run that command exactly.
- Then save the proccess: `pm2 save`

#### What is server boot:
A reboot happens when:

You restart the EC2 instance

AWS moves or maintains hardware

You stop → start the instance

The server crashes or updates

When a server reboots:

Everything in memory is wiped

#### Without Auto-Start
EC2 reboots ❌

PM2 stops ❌

Node app stops ❌

Your API is down ❌

No errors. No warnings. Just offline.
#### With Auto-Start Enabled
C2 reboots 🔄

OS boots 🧠

PM2 starts automatically

PM2 restarts your app 🚀

👉 Zero human action needed

This is mandatory in production systems.

- Remove Pm2 from startup script:
`pm2 unstartup`
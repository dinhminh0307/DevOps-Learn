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
# Install Docker
```
sudo apt update
sudo apt install -y docker.io
```
# Start Docker
```
sudo systemctl start docker
sudo systemctl enable docker
```
# Allow Docker Without sudo
- By default, Docker needs sudo.
`sudo usermod -aG docker ubuntu`
- Now log out and log back in:
`exit`
- SSH again
- test with `docker ps`

# Prepare app for docker
## Create Docker file
```
# 1️⃣ Use official Node.js image
FROM node:18-alpine

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy package files first (cache optimization)
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install --production

# 5️⃣ Copy app source code
COPY . .

# 6️⃣ Expose app port
EXPOSE 3000

# 7️⃣ Start the app
CMD ["node", "index.js"]
```
- Build docker image
`docker build -t node-backend-test-app`
- Run container:
```
docker run -d \
  --name node-backend \
  -p 3000:3000 \
  node-backend-test-app
```
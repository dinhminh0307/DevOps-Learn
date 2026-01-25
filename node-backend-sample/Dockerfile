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

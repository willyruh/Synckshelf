FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# In production, we'd build. For development/demo, we use dev server.
CMD ["npm", "run", "dev"]

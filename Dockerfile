# Stage 1: Install Gatsby CLI and Node.js
FROM node:latest as builder

# Set working directory in the container
WORKDIR /usr/src/app

# Install Gatsby CLI globally
RUN npm install -g gatsby-cli

# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Install the correct version of Node.js using NVM
RUN . ~/.nvm/nvm.sh && nvm install 21.2.0

# Stage 2: Install dependencies and start the development server
FROM builder as development

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies using Yarn
RUN yarn

RUN npm update --force

# Copy the rest of the application code to the container
COPY . .

# Start the development server
CMD ["npm", "start"]

# Stage 3: Build the production version
FROM builder as production

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies using Yarn
RUN yarn

# Copy the rest of the application code to the container
COPY . .

# Generate a full static production build
RUN npm run build

# Stage 4: Serve the production build
FROM nginx:1.25.3-alpine-slim as serve

# Copy built files from the previous stage
COPY --from=production /usr/src/app/public /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to start NGINX
CMD ["nginx", "-g", "daemon off;"]

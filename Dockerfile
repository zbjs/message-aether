# Use the official Node.js image.
FROM node:20-buster-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "node", "index.js" ]

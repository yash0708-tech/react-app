# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

COPY . .
# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Build the React app (if needed)
RUN npm run build

# Expose the port on which your React app will run (if needed)
EXPOSE 3001

# Start the React app
CMD npm run dev

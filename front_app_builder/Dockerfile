# Step 1: Build the Angular app using Node.js
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the Angular app code
COPY . .

# Build the Angular app in production mode
RUN npm run build --prod

# Step 2: Serve the Angular app using Nginx
FROM nginx:alpine

# Copy the built Angular app from the previous stage
COPY --from=build /app/dist/front_app_builder /usr/share/nginx/html

# Expose the Nginx port (default is 80)
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]

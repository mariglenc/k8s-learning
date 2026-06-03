# Start from a small official Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy our app file into the container
COPY server.js .

# Tell Docker the container listens on port 3000
EXPOSE 3000

# Command to run when the container starts
CMD ["node", "server.js"]
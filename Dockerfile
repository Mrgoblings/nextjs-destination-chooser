# Specify the base image
FROM node:21.4.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Setup prisma
RUN npx prisma generate
RUN npx prisma migrate
RUN npx prisma generate

# Build the application 
RUN npm run build

# Expose the port on which the application will run
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
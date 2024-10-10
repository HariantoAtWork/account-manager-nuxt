##### Build
# Use an official Node runtime as the base image
FROM node:20.16-alpine as builder

# Set the working directory in the container
WORKDIR /build

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Nuxt app
RUN npm run build


##### Deploy
FROM node:20.16-alpine

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV NODE_WORKDIR=/app
WORKDIR $NODE_WORKDIR

# COPY package.json $NODE_WORKDIR/
# RUN npm shrinkwrap
# RUN npm i
COPY --from=builder /build/.output $NODE_WORKDIR

CMD ["node", "server/index.mjs"]
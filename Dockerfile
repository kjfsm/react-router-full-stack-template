FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json yarn.lock .yarnrc.yml ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production=false

# Copy source code
COPY . .

# Generate Prisma client
RUN yarn db:generate

# Build the app
RUN yarn build

# Remove dev dependencies to reduce image size
RUN yarn install --frozen-lockfile --production=true && yarn cache clean

EXPOSE 3000

CMD ["yarn", "start"]
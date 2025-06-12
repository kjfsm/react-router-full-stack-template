FROM node:18-alpine

# Install git and other essentials for development
RUN apk add --no-cache git bash curl

# Install dependencies for Playwright
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set environment variables for Playwright
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Create and set workspace
WORKDIR /workspace

# Install global tools
RUN npm install -g typescript

# Set up non-root user
RUN addgroup -g 1000 node && adduser -u 1000 -G node -s /bin/bash -D node
USER node

# Default command
CMD ["bash"]
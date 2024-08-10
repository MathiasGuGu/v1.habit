# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine AS base

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Install dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# If you use Yarn
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
# If you use npm
    elif [ -f package-lock.json ]; then npm install --legacy-peer-deps; \
# If you use pnpm
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Step 4: Copy the rest of the application code
COPY . .

# Step 5: Build the application
RUN if [ -f yarn.lock ]; then yarn build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Step 6: Use a minimal Node.js runtime for the production environment
FROM node:18-alpine AS production

WORKDIR /app

# Copy the node_modules and build from the previous stage
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json

# Step 7: Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Step 8: Expose the port and define the command to run the app
EXPOSE 3000

CMD ["npm", "start"]

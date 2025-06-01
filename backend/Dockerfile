# 1) Build Stage
FROM node:lts AS builder
WORKDIR /app

# 1a) Copy only the deps and TS config first, install them
COPY package.json package-lock.json tsconfig.json ./
RUN npm install

# 1b) Now copy your source and compile
COPY src ./src
RUN npm run build    # runs `tsc`, emitting into /app/dist

# 2) Production Stage
FROM node:lts-alpine AS release
WORKDIR /app

# 2a) Copy compiled output
COPY --from=builder /app/dist ./dist

# 2b) Copy only the minimal package files and prune dev deps
COPY package.json package-lock.json ./
RUN npm prune --production

# 2c) Start the server
CMD ["node", "dist/server.js"]

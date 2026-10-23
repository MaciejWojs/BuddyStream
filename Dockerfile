FROM docker.io/oven/bun:1.4.4-alpine
COPY package.json bun.lock ./
RUN bun pm fetch

COPY . .
RUN bun install --offline --frozen-lockfile

CMD ["bun", "run", "dev"]
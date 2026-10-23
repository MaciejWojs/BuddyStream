FROM docker.io/oven/bun:1.4.4-alpine AS builder
WORKDIR /build

COPY package.json bun.lock ./
RUN bun pm fetch

COPY . .
RUN bun install --offline --frozen-lockfile
RUN bun build src/ --compile --outfile app --target bun

FROM docker.io/oven/bun:1.4.4-alpine

RUN addgroup -S backend-group && \
    adduser -S -D -H -G backend-group backend-user

WORKDIR /backend

COPY --chmod=500 --chown=backend-user:backend-group \
    --from=builder /build/app /backend/app

USER backend-user:backend-group

CMD ["/backend/app"]
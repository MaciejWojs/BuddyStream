FROM docker.io/oven/bun:1.4.4-alpine AS builder
WORKDIR /build

COPY package.json bun.lock ./
RUN bun pm fetch

COPY . .
RUN bun install --offline --frozen-lockfile --ignore-scripts --production
RUN bun build src/ --compile --outfile app --target bun

FROM docker.io/oven/bun:1.4.4-alpine

RUN addgroup -S backend-group && \
adduser -S -D -H -G backend-group backend-user

COPY --chown=backend-user:backend-group --from=docker.io/arigaio/atlas:1.2.3-distroless /atlas /usr/local/bin/atlas

WORKDIR /backend

COPY --chmod=500 --chown=backend-user:backend-group \
    --from=builder /build/app /backend/app

USER backend-user:backend-group

CMD ["/backend/app"]
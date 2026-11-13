FROM docker.io/oven/bun:1.4.4-alpine AS builder
WORKDIR /build

COPY package.json bun.lock ./
RUN bun pm fetch

COPY . .
RUN bun install --offline --frozen-lockfile --ignore-scripts
RUN bun build --check src/ --minify --compile --bytecode --no-compile-autoload-bunfig --outfile app --target bun

FROM docker.io/oven/bun:1.4.4-alpine

RUN addgroup -S backend-group && \
adduser -S -D -H -G backend-group backend-user

COPY --chown=root:root --chmod=555 --from=docker.io/arigaio/atlas:1.3.0-distroless /atlas /usr/local/bin/atlas

WORKDIR /backend

COPY --chown=root:root --chmod=555 \
    --from=builder /build/app /backend/app

COPY --chown=root:root --chmod=555 \
    --from=builder /build/package.json /backend/package.json

USER backend-user:backend-group

CMD ["/backend/app"]
FROM ghcr.io/pnpm/pnpm@sha256:4d561daf74b0775b389a6cef94806582fa5ab3e8ce73a17cef64a4eed2b69239 AS builder

ENV PNPM_HOME="/pnpm"

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,target=${PNPM_HOME} \
  pnpm install --frozen-lockfile --ignore-scripts --prefer-offline

COPY . .

RUN pnpm build

FROM ghcr.io/pnpm/pnpm@sha256:4d561daf74b0775b389a6cef94806582fa5ab3e8ce73a17cef64a4eed2b69239 AS dependencies

ENV PNPM_HOME="/pnpm"

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,target=${PNPM_HOME} \
  pnpm install --frozen-lockfile --prod --ignore-scripts --prefer-offline

FROM gcr.io/distroless/nodejs24-debian13@sha256:e7192174b2b2e5db60cb8f8fc3dcb8cb8e0456f961387c4e0556118f09dcb7c8 AS runner

WORKDIR /build

COPY --from=dependencies /app/node_modules ./node_modules

COPY --from=builder /app/build ./build

CMD ["build/index.js"]

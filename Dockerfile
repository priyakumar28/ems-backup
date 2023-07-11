FROM node:16-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./ 
RUN npm ci

FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG azure_client_id
ENV NEXT_PUBLIC_AZURE_AD_CLIENT_ID=$azure_client_id

ARG azure_authority_url
ENV NEXT_PUBLIC_AZURE_AUTHORITY_URL=$azure_authority_url

ARG azure_tenant_id
ENV NEXT_PUBLIC_AZURE_AD_TENANT_ID=$azure_tenant_id

RUN npm run build
FROM node:16-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 ems-staging-user

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.sequelizerc ./.sequelizerc
COPY --from=builder /app/.babelrc ./.babelrc

COPY --from=builder --chown=ems-staging-user:nodejs /app/.next/standalone ./
COPY --from=builder --chown=ems-staging-user:nodejs /app/.next/static ./.next/static
USER ems-staging-user

EXPOSE 3000

CMD ["node", "server.js"]
#!/bin/sh
set -e

echo "🚀 Running migrations..."
pnpm prisma migrate deploy

echo "🌱 Running seed..."
node dist/libs/shared/database/seeder/seeder.js

echo "🔥 Starting server..."
exec node dist/apps/api/src/main.js
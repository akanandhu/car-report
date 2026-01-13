import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load environment variables from .env.docker if it exists, otherwise from .env
const envDockerPath = path.resolve(process.cwd(), '.env.docker');
const envPath = path.resolve(process.cwd(), '.env');

if (fs.existsSync(envDockerPath)) {
    console.log('📝 Loading environment from .env.docker');
    dotenv.config({ path: envDockerPath });
} else if (fs.existsSync(envPath)) {
    console.log('📝 Loading environment from .env');
    dotenv.config({ path: envPath });
} else {
    console.warn('⚠️ No .env or .env.docker file found');
}

export const config = {
    database: {
        url: process.env.DATABASE_URL || '',
    },
    backend: {
        port: parseInt(process.env.BACKEND_PORT || '3000', 10),
        apiUrl: process.env.BACKEND_API_URL || 'http://localhost:3000',
    },
    environment: process.env.NODE_ENV || 'development',
};

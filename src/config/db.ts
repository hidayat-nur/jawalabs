import { Pool } from 'pg';

declare global {

    var pool: Pool | undefined;
}

let pool: Pool;

if (!global.pool) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    if (process.env.NODE_ENV === 'development') {
        global.pool = pool;
    }
} else {
    pool = global.pool;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const query = (text: string, params?: any[]) => {
    return pool.query(text, params);
};

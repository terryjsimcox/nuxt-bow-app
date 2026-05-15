import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

// Optimized connection pool configuration
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL!,
  waitForConnections: true,
  connectionLimit: 10, // Reduced for dev environment
  queueLimit: 50, // Reduced for dev environment
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  maxIdle: 5, // Reduced idle connections
  idleTimeout: 10000, // Faster cleanup in dev (10s)
});

// Graceful shutdown handler
if (process.env.NODE_ENV === 'development') {
  process.on('SIGTERM', async () => {
    await pool.end();
  });
  process.on('SIGINT', async () => {
    await pool.end();
    process.exit(0);
  });
}

// Initialize drizzle without schema to reduce memory usage
// Import specific tables only where needed in API routes
export const db = drizzle(pool);
export { pool }; // Export pool for graceful shutdown

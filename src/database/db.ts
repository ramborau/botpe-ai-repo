import initSqlJs, { Database } from 'sql.js';
import * as fs from 'fs';
import * as path from 'path';

const DB_PATH = path.resolve(__dirname, '../../data/whatsapp.db');
const SCHEMA_PATH = path.resolve(__dirname, 'schema.sql');

let db: Database | null = null;

/**
 * Initialize the SQLite database
 */
export async function initDatabase(): Promise<Database> {
  if (db) {
    return db;
  }

  const SQL = await initSqlJs();

  // Ensure data directory exists
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Load existing database or create new one
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
    console.log('📂 Database loaded from:', DB_PATH);
  } else {
    db = new SQL.Database();
    console.log('🆕 New database created');

    // Run schema
    const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
    db.exec(schema);
    console.log('✅ Database schema initialized');

    // Save to file
    saveDatabase();
  }

  return db;
}

/**
 * Save database to file
 */
export function saveDatabase(): void {
  if (!db) {
    throw new Error('Database not initialized');
  }

  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

/**
 * Get database instance
 */
export function getDatabase(): Database {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first');
  }
  return db;
}

/**
 * Close database connection
 */
export function closeDatabase(): void {
  if (db) {
    saveDatabase();
    db.close();
    db = null;
    console.log('📪 Database closed');
  }
}

// Auto-save every 30 seconds
setInterval(() => {
  if (db) {
    saveDatabase();
  }
}, 30000);

// Save on process exit
process.on('exit', () => {
  closeDatabase();
});

process.on('SIGINT', () => {
  closeDatabase();
  process.exit(0);
});

import * as fs from 'fs';
import * as path from 'path';

const LOGS_DIR = path.resolve(__dirname, '../../logs');
const MESSAGES_LOG = path.join(LOGS_DIR, 'messages.json');

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

// Initialize messages log file if it doesn't exist
if (!fs.existsSync(MESSAGES_LOG)) {
  fs.writeFileSync(MESSAGES_LOG, '[]', 'utf8');
}

/**
 * Console colors for better readability
 */
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

/**
 * Format timestamp
 */
function getTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Log to console with colors
 */
function logToConsole(level: string, message: string, data?: any): void {
  const timestamp = getTimestamp();
  let color = colors.white;

  switch (level) {
    case 'INFO':
      color = colors.cyan;
      break;
    case 'SUCCESS':
      color = colors.green;
      break;
    case 'WARNING':
      color = colors.yellow;
      break;
    case 'ERROR':
      color = colors.red;
      break;
    case 'WEBHOOK':
      color = colors.magenta;
      break;
  }

  console.log(
    `${colors.dim}[${timestamp}]${colors.reset} ${color}${level}${colors.reset} ${message}`
  );

  if (data) {
    console.log(colors.dim + JSON.stringify(data, null, 2) + colors.reset);
  }
}

/**
 * Append log entry to messages.json file
 */
function logToFile(entry: any): void {
  try {
    // Read existing logs
    const existingLogs = JSON.parse(fs.readFileSync(MESSAGES_LOG, 'utf8'));

    // Append new entry
    existingLogs.push(entry);

    // Keep only last 1000 entries to prevent file from growing too large
    if (existingLogs.length > 1000) {
      existingLogs.shift();
    }

    // Write back to file
    fs.writeFileSync(MESSAGES_LOG, JSON.stringify(existingLogs, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to log file:', error);
  }
}

/**
 * Log incoming message
 */
export function logIncomingMessage(data: any): void {
  const entry = {
    type: 'incoming_message',
    timestamp: getTimestamp(),
    data,
  };

  logToConsole('WEBHOOK', '📨 Incoming Message', data);
  logToFile(entry);
}

/**
 * Log message status update
 */
export function logMessageStatus(data: any): void {
  const entry = {
    type: 'status_update',
    timestamp: getTimestamp(),
    data,
  };

  logToConsole('WEBHOOK', '📊 Status Update', data);
  logToFile(entry);
}

/**
 * Log interactive response
 */
export function logInteractiveResponse(data: any): void {
  const entry = {
    type: 'interactive_response',
    timestamp: getTimestamp(),
    data,
  };

  logToConsole('WEBHOOK', '🔘 Interactive Response', data);
  logToFile(entry);
}

/**
 * Log general info
 */
export function logInfo(message: string, data?: any): void {
  logToConsole('INFO', message, data);
}

/**
 * Log success
 */
export function logSuccess(message: string, data?: any): void {
  logToConsole('SUCCESS', '✅ ' + message, data);
}

/**
 * Log warning
 */
export function logWarning(message: string, data?: any): void {
  logToConsole('WARNING', '⚠️  ' + message, data);
}

/**
 * Log error
 */
export function logError(message: string, error?: any): void {
  const entry = {
    type: 'error',
    timestamp: getTimestamp(),
    message,
    error: error?.message || error,
  };

  logToConsole('ERROR', '❌ ' + message, error);
  logToFile(entry);
}

/**
 * Get log file path
 */
export function getLogFilePath(): string {
  return MESSAGES_LOG;
}

/**
 * Read all logs from file
 */
export function readLogs(limit?: number): any[] {
  try {
    const logs = JSON.parse(fs.readFileSync(MESSAGES_LOG, 'utf8'));
    if (limit) {
      return logs.slice(-limit);
    }
    return logs;
  } catch (error) {
    return [];
  }
}

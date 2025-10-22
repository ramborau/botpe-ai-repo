import { getDatabase, saveDatabase } from './db';

export interface IncomingMessage {
  queueId?: string;
  fromNumber: string;
  toNumber: string;
  messageType: string;
  content: any;
  timestamp: number;
}

export interface MessageStatus {
  queueId: string;
  status: string;
  timestamp: number;
  errorMessage?: string;
}

export interface InteractiveResponse {
  queueId?: string;
  userNumber: string;
  responseType: string;
  responseId?: string;
  responseTitle?: string;
  responseData: any;
  timestamp: number;
}

/**
 * Save an incoming message to the database
 */
export function saveIncomingMessage(message: IncomingMessage): number {
  const db = getDatabase();

  const stmt = db.prepare(
    'INSERT INTO messages (queue_id, from_number, to_number, message_type, content, timestamp) VALUES (?, ?, ?, ?, ?, ?)'
  );

  stmt.run([
    message.queueId || null,
    message.fromNumber,
    message.toNumber,
    message.messageType,
    JSON.stringify(message.content),
    message.timestamp,
  ]);

  const result = db.exec('SELECT last_insert_rowid() as id');
  const id = result[0].values[0][0] as number;

  saveDatabase();
  return id;
}

/**
 * Update message status
 */
export function updateMessageStatus(status: MessageStatus): void {
  const db = getDatabase();

  const stmt = db.prepare(
    'INSERT INTO message_status (queue_id, status, timestamp, error_message) VALUES (?, ?, ?, ?)'
  );

  stmt.run([status.queueId, status.status, status.timestamp, status.errorMessage || null]);

  saveDatabase();
}

/**
 * Save interactive response (button/list selection)
 */
export function saveInteractiveResponse(response: InteractiveResponse): number {
  const db = getDatabase();

  const stmt = db.prepare(
    'INSERT INTO interactive_responses (queue_id, user_number, response_type, response_id, response_title, response_data, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );

  stmt.run([
    response.queueId || null,
    response.userNumber,
    response.responseType,
    response.responseId || null,
    response.responseTitle || null,
    JSON.stringify(response.responseData),
    response.timestamp,
  ]);

  const result = db.exec('SELECT last_insert_rowid() as id');
  const id = result[0].values[0][0] as number;

  saveDatabase();
  return id;
}

/**
 * Get message history for a phone number
 */
export function getMessageHistory(phoneNumber: string, limit: number = 50): any[] {
  const db = getDatabase();

  const stmt = db.prepare(
    'SELECT * FROM messages WHERE from_number = ? OR to_number = ? ORDER BY timestamp DESC LIMIT ?'
  );

  stmt.bind([phoneNumber, phoneNumber, limit]);

  const messages = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    messages.push({
      ...row,
      content: JSON.parse(row.content as string),
    });
  }

  stmt.free();
  return messages;
}

/**
 * Get all messages with optional filters
 */
export function getAllMessages(limit: number = 100): any[] {
  const db = getDatabase();

  const result = db.exec(`SELECT * FROM messages ORDER BY timestamp DESC LIMIT ${limit}`);

  if (result.length === 0) {
    return [];
  }

  const columns = result[0].columns;
  const values = result[0].values;

  return values.map((row) => {
    const message: any = {};
    columns.forEach((col, idx) => {
      message[col] = row[idx];
    });
    if (message.content) {
      message.content = JSON.parse(message.content);
    }
    return message;
  });
}

/**
 * Get status updates for a queue ID
 */
export function getMessageStatusHistory(queueId: string): any[] {
  const db = getDatabase();

  const stmt = db.prepare(
    'SELECT * FROM message_status WHERE queue_id = ? ORDER BY timestamp ASC'
  );

  stmt.bind([queueId]);

  const statuses = [];
  while (stmt.step()) {
    statuses.push(stmt.getAsObject());
  }

  stmt.free();
  return statuses;
}

/**
 * Get interactive responses for a user
 */
export function getUserInteractions(userNumber: string, limit: number = 50): any[] {
  const db = getDatabase();

  const stmt = db.prepare(
    'SELECT * FROM interactive_responses WHERE user_number = ? ORDER BY timestamp DESC LIMIT ?'
  );

  stmt.bind([userNumber, limit]);

  const interactions = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    interactions.push({
      ...row,
      responseData: JSON.parse(row.response_data as string),
    });
  }

  stmt.free();
  return interactions;
}

/**
 * Get database statistics
 */
export function getStats(): any {
  const db = getDatabase();

  const totalMessages = db.exec('SELECT COUNT(*) as count FROM messages')[0].values[0][0];
  const totalStatuses = db.exec('SELECT COUNT(*) as count FROM message_status')[0].values[0][0];
  const totalInteractions = db.exec('SELECT COUNT(*) as count FROM interactive_responses')[0]
    .values[0][0];

  return {
    totalMessages,
    totalStatuses,
    totalInteractions,
  };
}

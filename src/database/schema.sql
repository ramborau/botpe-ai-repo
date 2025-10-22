-- WhatsApp Messages Database Schema

-- Table for storing all incoming messages
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    queue_id TEXT UNIQUE,
    from_number TEXT NOT NULL,
    to_number TEXT NOT NULL,
    message_type TEXT NOT NULL, -- text, image, video, document, audio, location, contact, etc.
    content TEXT, -- JSON string containing message content
    timestamp INTEGER NOT NULL, -- Unix timestamp
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table for message delivery status updates
CREATE TABLE IF NOT EXISTS message_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    queue_id TEXT NOT NULL,
    status TEXT NOT NULL, -- queued, sent, delivered, read, failed
    timestamp INTEGER NOT NULL,
    error_message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (queue_id) REFERENCES messages(queue_id)
);

-- Table for interactive responses (buttons, lists)
CREATE TABLE IF NOT EXISTS interactive_responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    queue_id TEXT,
    user_number TEXT NOT NULL,
    response_type TEXT NOT NULL, -- button_reply, list_reply
    response_id TEXT, -- button/list item ID
    response_title TEXT, -- button/list item title
    response_data TEXT, -- JSON string with full response
    timestamp INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_messages_from ON messages(from_number);
CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp);
CREATE INDEX IF NOT EXISTS idx_message_status_queue_id ON message_status(queue_id);
CREATE INDEX IF NOT EXISTS idx_interactive_user ON interactive_responses(user_number);

# BotPe WhatsApp AI Bots

A TypeScript library for sending WhatsApp messages via the BotPe API. This library provides a clean, type-safe interface for sending all types of WhatsApp messages except product messages.

## Features

- **12 Message Types Supported**:
  - Text messages
  - Images
  - Videos
  - Documents
  - Audio
  - Stickers
  - Locations
  - Contacts
  - Interactive Lists
  - Interactive Buttons
  - Interactive Buttons with Media
  - Catalog Messages

- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Easy to Use**: Simple, intuitive API
- **Fully Configured**: Uses environment variables for secure configuration

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
BASE_URL=https://crm.botpe.in/api/meta
VERSION=19.0
BUSINESS_PHONE_NUMBER_ID=your_phone_number_id
TOKEN=your_api_token
```

Your `.env` file should already be configured with your BotPe API credentials.

## Quick Start

```typescript
import { sendTextMessage } from './src/messages';

// Send a simple text message
const response = await sendTextMessage(
  '919876543210', // Recipient phone number with country code
  'Hello from BotPe!',
  true // Enable URL preview
);

console.log('Message sent!', response.messages[0].id);
```

## Usage Examples

### 1. Text Message

```typescript
import { sendTextMessage } from './src/messages';

await sendTextMessage(
  '919876543210',
  'Hello! This is a test message.',
  true // Enable URL preview
);
```

### 2. Image Message

```typescript
import { sendImageMessage } from './src/messages';

await sendImageMessage(
  '919876543210',
  { link: 'https://example.com/image.jpg' },
  'Check out this image!'
);
```

### 3. Video Message

```typescript
import { sendVideoMessage } from './src/messages';

await sendVideoMessage(
  '919876543210',
  { link: 'https://example.com/video.mp4' },
  'Watch this video!'
);
```

### 4. Document Message

```typescript
import { sendDocumentMessage } from './src/messages';

await sendDocumentMessage(
  '919876543210',
  { link: 'https://example.com/document.pdf' },
  'Here is the document',
  'report.pdf'
);
```

### 5. Audio Message

```typescript
import { sendAudioMessage } from './src/messages';

await sendAudioMessage(
  '919876543210',
  { link: 'https://example.com/audio.mp3' }
);
```

### 6. Location Message

```typescript
import { sendLocationMessage } from './src/messages';

await sendLocationMessage(
  '919876543210',
  28.6139, // Latitude
  77.209,  // Longitude
  'India Gate',
  'Rajpath, New Delhi, India'
);
```

### 7. Contact Message

```typescript
import { sendContactMessage } from './src/messages';

await sendContactMessage('919876543210', [
  {
    name: {
      formatted_name: 'John Doe',
      first_name: 'John',
      last_name: 'Doe',
    },
    phones: [
      {
        phone: '+1234567890',
        type: 'CELL',
      },
    ],
    emails: [
      {
        email: 'john@example.com',
        type: 'WORK',
      },
    ],
  },
]);
```

### 8. Interactive List Message

```typescript
import { sendInteractiveListMessage } from './src/messages';

await sendInteractiveListMessage('919876543210', {
  header: {
    type: 'text',
    text: 'Choose Your Service',
  },
  body: {
    text: 'Select a service from the list:',
  },
  footer: {
    text: 'Powered by BotPe',
  },
  action: {
    button: 'View Services',
    sections: [
      {
        title: 'Support',
        rows: [
          {
            id: 'support_1',
            title: 'General Support',
            description: 'Get help with general queries',
          },
        ],
      },
    ],
  },
});
```

### 9. Interactive Buttons Message

```typescript
import { sendInteractiveButtonsMessage } from './src/messages';

await sendInteractiveButtonsMessage('919876543210', {
  body: {
    text: 'How can we help you?',
  },
  action: {
    buttons: [
      {
        type: 'reply',
        reply: { id: 'btn_1', title: 'Support' },
      },
      {
        type: 'reply',
        reply: { id: 'btn_2', title: 'Sales' },
      },
    ],
  },
});
```

### 10. Interactive Buttons with Media

```typescript
import { sendInteractiveButtonsMediaMessage } from './src/messages';

await sendInteractiveButtonsMediaMessage('919876543210', {
  header: {
    type: 'image',
    image: { link: 'https://example.com/product.jpg' },
  },
  body: {
    text: 'Check out our latest product!',
  },
  action: {
    buttons: [
      {
        type: 'reply',
        reply: { id: 'buy', title: 'Buy Now' },
      },
    ],
  },
});
```

### 11. Catalog Message

```typescript
import { sendCatalogMessage } from './src/messages';

await sendCatalogMessage('919876543210', {
  body: {
    text: 'Browse our catalog!',
  },
  action: {
    name: 'catalog_message',
  },
});
```

## Running Examples

To test all message types, run the example file:

```bash
# Install dependencies first
npm install

# Run the examples
npm run test
```

Edit `examples/send-all-messages.ts` to:
1. Update `RECIPIENT_PHONE` with your test phone number
2. Uncomment the message types you want to test
3. Run `npm run test`

## Building

Compile TypeScript to JavaScript:

```bash
npm run build
```

This creates the compiled code in the `dist/` folder.

## Project Structure

```
BotPe-AI-Bots/
├── src/
│   ├── client/
│   │   └── api-client.ts           # API client with authentication
│   ├── config/
│   │   └── env.ts                  # Environment configuration
│   ├── database/
│   │   ├── db.ts                   # SQLite connection
│   │   ├── operations.ts           # Database operations
│   │   └── schema.sql              # Database schema
│   ├── messages/
│   │   └── index.ts                # All message sending functions
│   ├── types/
│   │   └── messages.ts             # TypeScript interfaces
│   ├── utils/
│   │   └── logger.ts               # Console & file logging
│   ├── validation/
│   │   └── constraints.ts          # WhatsApp message constraints
│   ├── webhook/
│   │   ├── handlers/
│   │   │   ├── messageHandler.ts   # Incoming message handler
│   │   │   ├── statusHandler.ts    # Status update handler
│   │   │   └── interactiveHandler.ts # Interactive response handler
│   │   └── server.ts               # Express webhook server
│   └── index.ts                    # Main export file
├── examples/
│   ├── send-all-messages.ts        # Sending examples
│   ├── quick-start.ts              # Quick test script
│   └── test-webhook.ts             # Webhook test script
├── scripts/
│   └── start-tunnel.sh             # Serveo.net tunnel script
├── logs/
│   └── messages.json               # Message logs
├── data/
│   └── whatsapp.db                 # SQLite database
├── .env                            # Environment variables (not in git)
├── package.json
├── tsconfig.json
└── README.md
```

## API Reference

All functions return a `Promise<MessageResponse>` with the following structure:

```typescript
{
  messaging_product: "whatsapp",
  contacts: [{ input: string, wa_id: string }],
  messages: [{ id: string }]
}
```

### Available Functions

- `sendTextMessage(to, body, previewUrl?)`
- `sendImageMessage(to, image, caption?)`
- `sendVideoMessage(to, video, caption?)`
- `sendDocumentMessage(to, document, caption?, filename?)`
- `sendAudioMessage(to, audio)`
- `sendStickerMessage(to, sticker)`
- `sendLocationMessage(to, latitude, longitude, name?, address?)`
- `sendContactMessage(to, contacts)`
- `sendInteractiveListMessage(to, interactive)`
- `sendInteractiveButtonsMessage(to, interactive)`
- `sendInteractiveButtonsMediaMessage(to, interactive)`
- `sendCatalogMessage(to, catalog)`

## Phone Number Format

All recipient phone numbers should include the country code without `+` or `00`:

- Correct: `919876543210` (India)
- Correct: `14155551234` (USA)
- Wrong: `+919876543210`
- Wrong: `9876543210` (missing country code)

## Error Handling

All functions throw errors if the API request fails:

```typescript
try {
  const response = await sendTextMessage('919876543210', 'Hello!');
  console.log('Success:', response.messages[0].id);
} catch (error) {
  console.error('Failed to send message:', error);
}
```

## Webhook Server

The webhook server receives incoming WhatsApp messages from BotPe and stores them in a SQLite database.

### Setup

1. **Start the webhook server:**

```bash
npm run webhook
```

The server will start on port 3000 (configurable via `WEBHOOK_PORT` in `.env`).

2. **Create a public tunnel using serveo.net:**

In a separate terminal:

```bash
npm run tunnel
```

This will create a public HTTPS URL that forwards to your local webhook server. Copy the URL shown.

3. **Configure webhook in BotPe:**

- Go to your BotPe dashboard
- Navigate to webhook settings
- Set webhook URL to: `https://YOUR_SERVEO_URL/webhook`
- Set verify token to: `botpe_webhook_verify_2025` (or your custom token from `.env`)

### Webhook Endpoints

- `GET /webhook` - Webhook verification endpoint
- `POST /webhook` - Receive incoming messages
- `GET /health` - Health check
- `GET /stats` - Database statistics
- `GET /messages?limit=50` - Get recent messages

### Supported Events

The webhook handles:
- **Incoming Messages**: Text, images, videos, documents, audio, locations, contacts
- **Message Status**: Delivery status updates (sent, delivered, read, failed)
- **Interactive Responses**: Button clicks and list selections from users

### Message Storage

All webhook events are:
1. **Logged to console** with colored output
2. **Saved to file** at `logs/messages.json`
3. **Stored in SQLite database** at `data/whatsapp.db`

### Testing the Webhook

Test the webhook locally with simulated events:

```bash
# In terminal 1: Start webhook server
npm run webhook

# In terminal 2: Send test webhook events
npx ts-node examples/test-webhook.ts
```

### Database Schema

The SQLite database has three tables:

- **messages** - All incoming messages
- **message_status** - Message delivery status updates
- **interactive_responses** - Button clicks and list selections

View stats: http://localhost:3000/stats

### WhatsApp Message Constraints

All messages are validated against WhatsApp's limits:

**Text Messages:**
- Body: 4,096 characters max
- Formatting supported: `*bold*`, `_italic_`, `- bulleted list`

**Interactive Buttons:**
- Button title: 20 characters max
- Header text: 60 characters max
- Header types: text, image, video, document

**Interactive Lists:**
- Row title: 24 characters max
- Section title: 24 characters max
- Row description: 72 characters max
- Maximum rows: 10 total

**Footer (all types):**
- 60 characters max

**Media Captions:**
- 1,024 characters max

**File Sizes:**
- Image: 5MB max
- Video/Audio: 16MB max
- Document: 100MB max

## Next Steps (Step 2 - AI Integration)

- AI-powered multilingual bot using ChatGPT
- Context-aware conversations
- Multi-bot support with unique 3-char triggers
- Automatic responses based on incoming messages

## License

ISC

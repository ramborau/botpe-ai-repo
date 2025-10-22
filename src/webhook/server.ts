import express, { Request, Response } from 'express';
import { initDatabase } from '../database/db';
import { handleIncomingMessage } from './handlers/messageHandler';
import { handleMessageStatus } from './handlers/statusHandler';
import { handleInteractiveResponse } from './handlers/interactiveHandler';
import { logInfo, logSuccess, logError, logWarning } from '../utils/logger';
import { getStats, getAllMessages } from '../database/operations';

const app = express();
const PORT = process.env.WEBHOOK_PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

/**
 * GET /webhook - Webhook verification endpoint (Number 1)
 * Used by BotPe to verify the webhook URL
 * BotPe sends a 'challange' query parameter that must be echoed back
 */
app.get('/webhook', (req: Request, res: Response) => {
  try {
    // BotPe uses 'challange' (note the spelling) as the query parameter
    const challange = req.query['challange'];

    if (challange) {
      console.log('✅ Webhook verification (Number 1) - responding with challange:', challange);
      res.status(200).send(challange);
    } else {
      console.log('⚠️  No challange parameter found');
      res.status(400).send('No challange parameter');
    }
  } catch (error: any) {
    console.error('❌ Error in webhook verification:', error.message);
    res.status(500).send(error.message);
  }
});

/**
 * GET /webhook2 - Webhook verification endpoint (Number 2)
 * Used by BotPe to verify the webhook URL for second number
 * BotPe sends a 'challange' query parameter that must be echoed back
 */
app.get('/webhook2', (req: Request, res: Response) => {
  try {
    // BotPe uses 'challange' (note the spelling) as the query parameter
    const challange = req.query['challange'];

    if (challange) {
      console.log('✅ Webhook verification (Number 2) - responding with challange:', challange);
      res.status(200).send(challange);
    } else {
      console.log('⚠️  No challange parameter found');
      res.status(400).send('No challange parameter');
    }
  } catch (error: any) {
    console.error('❌ Error in webhook verification:', error.message);
    res.status(500).send(error.message);
  }
});

/**
 * POST /webhook - Receive incoming webhook events (Number 1)
 */
app.post('/webhook', async (req: Request, res: Response) => {
  try {
    const body = req.body;

    logInfo('📨 Received webhook event (Number 1)', body);

    // Respond quickly to acknowledge receipt
    res.sendStatus(200);

    // Process the webhook data asynchronously
    await processWebhookEvent(body);
  } catch (error) {
    logError('Error processing webhook', error);
    res.sendStatus(500);
  }
});

/**
 * POST /webhook2 - Receive incoming webhook events (Number 2)
 */
app.post('/webhook2', async (req: Request, res: Response) => {
  try {
    const body = req.body;

    logInfo('📨 Received webhook event (Number 2)', body);

    // Respond quickly to acknowledge receipt
    res.sendStatus(200);

    // Process the webhook data asynchronously (uses same handlers and database)
    await processWebhookEvent(body);
  } catch (error) {
    logError('Error processing webhook 2', error);
    res.sendStatus(500);
  }
});

/**
 * GET /health - Health check endpoint
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/**
 * GET /stats - Get database statistics
 */
app.get('/stats', (req: Request, res: Response) => {
  try {
    const stats = getStats();
    res.json(stats);
  } catch (error) {
    logError('Error getting stats', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

/**
 * GET /messages - Get recent messages
 */
app.get('/messages', (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const messages = getAllMessages(limit);
    res.json(messages);
  } catch (error) {
    logError('Error getting messages', error);
    res.status(500).json({ error: 'Failed to get messages' });
  }
});

/**
 * Process webhook event and route to appropriate handler
 * Handles Meta's WhatsApp Business API webhook format
 */
async function processWebhookEvent(body: any): Promise<void> {
  try {
    // Check if this is Meta's webhook format (has 'entry' array)
    if (body.entry && Array.isArray(body.entry)) {
      // Process Meta's WhatsApp Business API webhook format
      for (const entry of body.entry) {
        if (entry.changes && Array.isArray(entry.changes)) {
          for (const change of entry.changes) {
            const value = change.value;

            if (!value) continue;

            // Extract metadata (phone number ID and display number)
            const metadata = value.metadata || {};
            const phoneNumberId = metadata.phone_number_id;

            // Handle incoming messages
            if (value.messages && Array.isArray(value.messages)) {
              for (const message of value.messages) {
                // Add metadata to message
                const enrichedMessage = {
                  ...message,
                  to: phoneNumberId,
                  metadata,
                  contacts: value.contacts,
                };

                // Route based on message type
                if (message.type === 'interactive') {
                  await handleInteractiveResponse(enrichedMessage);
                } else {
                  await handleIncomingMessage(enrichedMessage);
                }
              }
            }

            // Handle status updates
            if (value.statuses && Array.isArray(value.statuses)) {
              for (const status of value.statuses) {
                await handleMessageStatus(status);
              }
            }
          }
        }
      }
    } else {
      // Fallback for other formats
      const eventType = body.event_type || body.type;

      switch (eventType) {
        case 'message':
        case 'messages':
          await handleIncomingMessage(body);
          break;

        case 'message_status':
        case 'status':
          await handleMessageStatus(body);
          break;

        case 'interactive':
          await handleInteractiveResponse(body);
          break;

        default:
          logWarning('Unknown webhook event type', body);
      }
    }
  } catch (error) {
    logError('Error in processWebhookEvent', error);
  }
}

/**
 * Start the webhook server
 */
async function startServer() {
  try {
    // Initialize database
    await initDatabase();
    logSuccess('Database initialized');

    // Start Express server
    app.listen(PORT, () => {
      console.log('\n' + '='.repeat(60));
      logSuccess(`Webhook server running on port ${PORT}`);
      console.log('='.repeat(60));
      console.log('');
      console.log('📡 Webhook endpoints:');
      console.log(`   GET  http://localhost:${PORT}/webhook  - Verification (Number 1)`);
      console.log(`   POST http://localhost:${PORT}/webhook  - Receive events (Number 1)`);
      console.log(`   GET  http://localhost:${PORT}/webhook2 - Verification (Number 2)`);
      console.log(`   POST http://localhost:${PORT}/webhook2 - Receive events (Number 2)`);
      console.log(`   GET  http://localhost:${PORT}/health   - Health check`);
      console.log(`   GET  http://localhost:${PORT}/stats    - Database stats`);
      console.log(`   GET  http://localhost:${PORT}/messages - Recent messages`);
      console.log('');
      console.log('🌐 To expose this webhook publicly, run:');
      console.log(`   npm run tunnel`);
      console.log('');
      console.log('='.repeat(60) + '\n');
    });
  } catch (error) {
    logError('Failed to start server', error);
    process.exit(1);
  }
}

// Start the server
startServer();

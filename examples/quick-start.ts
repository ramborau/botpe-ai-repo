import { sendTextMessage } from '../src/messages';

/**
 * Quick Start Example
 *
 * This is the simplest way to send a WhatsApp message using BotPe.
 *
 * To run this example:
 * 1. Update RECIPIENT_PHONE with your test phone number
 * 2. Run: npm run dev
 *
 * OR compile and run:
 * 1. npm run build
 * 2. node dist/examples/quick-start.js
 */

// Recipient phone number (with country code, no + sign)
const RECIPIENT_PHONE = '919422594226';

async function quickStart() {
  try {
    console.log('🚀 Sending WhatsApp message via BotPe...\n');

    const response = await sendTextMessage(
      RECIPIENT_PHONE,
      'Hello! This is a test message from BotPe WhatsApp AI Bot. 👋',
      true // Enable URL preview
    );

    console.log('✅ Message sent successfully!');
    console.log('📦 Queue ID:', response.message.queue_id);
    console.log('📊 Status:', response.message.message_status);
    console.log('📱 Channel:', response.messaging_channel);

  } catch (error) {
    console.error('❌ Error sending message:', error);
    process.exit(1);
  }
}

// Run the quick start
quickStart();

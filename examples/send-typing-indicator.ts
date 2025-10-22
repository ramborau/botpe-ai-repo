import { markReadAndStartTyping, sendTypingIndicator, markMessageAsRead } from '../src/messages/status';

/**
 * Test typing indicator and read receipt
 */

// The message ID from the last WhatsApp message received
const MESSAGE_ID = 'wamid.HBgMOTE5NDIyNTk0MjI2FQIAEhggQUMyMjgzOUJFMkIzM0ZGRDhCMEUwQzg3RTgwMTNDMjYA';
const RECIPIENT_PHONE = '919422594226';

async function testTypingIndicator() {
  try {
    console.log('🔵 Sending typing indicator and marking message as read...\n');

    // Method 1: Send both at once
    console.log('1️⃣  Marking message as read...');
    const readResponse = await markMessageAsRead(MESSAGE_ID);
    console.log('   ✅ Read receipt sent');
    console.log('   Response:', JSON.stringify(readResponse, null, 2));
    console.log('');

    // Wait a bit
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('2️⃣  Starting typing indicator...');
    const typingResponse = await sendTypingIndicator(RECIPIENT_PHONE, true);
    console.log('   ✅ Typing indicator started');
    console.log('   Response:', JSON.stringify(typingResponse, null, 2));
    console.log('');

    // Keep typing for 5 seconds
    console.log('⏳ Typing indicator active for 5 seconds...');
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Stop typing
    console.log('3️⃣  Stopping typing indicator...');
    const stopTypingResponse = await sendTypingIndicator(RECIPIENT_PHONE, false);
    console.log('   ✅ Typing indicator stopped');
    console.log('   Response:', JSON.stringify(stopTypingResponse, null, 2));

    console.log('\n✨ Test completed successfully!');
  } catch (error: any) {
    console.error('❌ Error:', error.message || error);
  }
}

testTypingIndicator();

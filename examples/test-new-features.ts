import { markReadAndStartTyping } from '../src/messages/status';
import { sendLocationRequestMessage } from '../src/messages';

const RECIPIENT = '919422594226';
// Message ID from the last received message "Hi"
const MESSAGE_ID = 'wamid.HBgMOTE5NDIyNTk0MjI2FQIAEhggQUM3QjIyREU1RjE2MTc1MjAyRjAwREY0MEQ0ODMwRjEA';

async function testNewFeatures() {
  console.log('🔬 Testing New Features\n');
  console.log('='.repeat(60));

  try {
    // 1. TEST TYPING INDICATOR (Combined Read + Typing)
    console.log('\n1️⃣  Testing Typing Indicator (Read + Typing Combined)...');
    console.log('   Message ID:', MESSAGE_ID);
    const typingResponse = await markReadAndStartTyping(MESSAGE_ID);
    console.log('   ✅ Response:', JSON.stringify(typingResponse, null, 2));
    console.log('');

    await sleep(2000);

    // 2. TEST LOCATION REQUEST MESSAGE
    console.log('\n2️⃣  Testing Location Request Message...');
    const locationRequest = await sendLocationRequestMessage(
      RECIPIENT,
      'We would love to serve you better! 📍\n\nCould you please share your current location with us? This helps us provide more accurate information.'
    );
    console.log('   ✅ Queue ID:', locationRequest.message.queue_id);
    console.log('   Response:', JSON.stringify(locationRequest, null, 2));

    console.log('\n' + '='.repeat(60));
    console.log('✨ All new features tested successfully!');
    console.log('📱 Check WhatsApp at', RECIPIENT);
    console.log('='.repeat(60));
  } catch (error: any) {
    console.error('\n❌ Error:', error.message || error);
    if (error.response?.data) {
      console.error('API Response:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

testNewFeatures();

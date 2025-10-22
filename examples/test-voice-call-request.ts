import { sendVoiceCallRequestMessage2 } from '../src/messages/index2';

const RECIPIENT = '919422594226';

async function testVoiceCallRequest() {
  console.log('📞 Testing Voice Call Request Message (Number 2)\n');
  console.log('='.repeat(60));

  try {
    console.log('\n📤 Sending Voice Call Request message from Number 2...');
    const response = await sendVoiceCallRequestMessage2(
      RECIPIENT,
      'You can call us on WhatsApp now for faster service!',
      'Call on WhatsApp',
      100,
      'payload data'
    );

    console.log('   ✅ Queue ID:', response.message.queue_id);
    console.log('   Response:', JSON.stringify(response, null, 2));

    console.log('\n' + '='.repeat(60));
    console.log('✨ Voice call request sent successfully!');
    console.log('📱 Check WhatsApp at', RECIPIENT);
    console.log('📞 Tap the "Call on WhatsApp" button to initiate a call');
    console.log('='.repeat(60));
  } catch (error: any) {
    console.error('\n❌ Error:', error.message || error);
    if (error.response?.data) {
      console.error('API Response:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testVoiceCallRequest();

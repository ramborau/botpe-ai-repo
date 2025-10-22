import { sendTextMessage2, sendImageMessage2 } from '../src/messages/index2';

const RECIPIENT = '919422594226';

async function testNumber2() {
  console.log('📱 Testing Second WhatsApp Number\n');
  console.log('='.repeat(60));

  try {
    // 1. Send a text message from Number 2
    console.log('\n1️⃣  Sending TEXT message from Number 2...');
    const text = await sendTextMessage2(
      RECIPIENT,
      '*Hello from Number 2!* 👋\n\nThis message is being sent from the second WhatsApp Business number using the new API client.'
    );
    console.log('   ✅ Queue ID:', text.message.queue_id);
    console.log('');

    await sleep(2000);

    // 2. Send an image message from Number 2
    console.log('2️⃣  Sending IMAGE message from Number 2...');
    const image = await sendImageMessage2(
      RECIPIENT,
      { link: 'https://picsum.photos/600/400' },
      'This image was sent from WhatsApp Number 2 📸'
    );
    console.log('   ✅ Queue ID:', image.message.queue_id);

    console.log('\n' + '='.repeat(60));
    console.log('✨ Messages from Number 2 sent successfully!');
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

testNumber2();

import {
  sendTextMessage,
  sendImageMessage,
  sendLocationMessage,
  sendInteractiveButtonsMessage,
} from '../src/messages';

const RECIPIENT_PHONE = '919422594226';

async function testMultipleMessages() {
  try {
    console.log('🚀 Testing Multiple WhatsApp Message Types\n');
    console.log(`📱 Sending to: ${RECIPIENT_PHONE}\n`);

    // Test 1: Text Message
    console.log('1️⃣  Testing Text Message...');
    const textResponse = await sendTextMessage(
      RECIPIENT_PHONE,
      '🎉 Welcome to BotPe AI! This is a test text message.',
      false
    );
    console.log('   ✅ Text sent - Queue ID:', textResponse.message.queue_id);
    console.log('');

    // Wait a bit between messages
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 2: Image Message
    console.log('2️⃣  Testing Image Message...');
    const imageResponse = await sendImageMessage(
      RECIPIENT_PHONE,
      { link: 'https://picsum.photos/800/600' },
      '📸 Here is a beautiful random image!'
    );
    console.log('   ✅ Image sent - Queue ID:', imageResponse.message.queue_id);
    console.log('');

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 3: Location Message
    console.log('3️⃣  Testing Location Message...');
    const locationResponse = await sendLocationMessage(
      RECIPIENT_PHONE,
      19.0760, // Latitude (Mumbai)
      72.8777, // Longitude
      'Mumbai, India',
      'Gateway of India, Mumbai'
    );
    console.log('   ✅ Location sent - Queue ID:', locationResponse.message.queue_id);
    console.log('');

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 4: Interactive Buttons
    console.log('4️⃣  Testing Interactive Buttons...');
    const buttonsResponse = await sendInteractiveButtonsMessage(RECIPIENT_PHONE, {
      body: {
        text: '👋 Welcome! How can we help you today?',
      },
      action: {
        buttons: [
          {
            type: 'reply',
            reply: { id: 'support', title: '🛟 Support' },
          },
          {
            type: 'reply',
            reply: { id: 'sales', title: '💼 Sales' },
          },
          {
            type: 'reply',
            reply: { id: 'info', title: 'ℹ️  Info' },
          },
        ],
      },
    });
    console.log('   ✅ Buttons sent - Queue ID:', buttonsResponse.message.queue_id);
    console.log('');

    console.log('✨ All tests completed successfully!\n');
    console.log('📬 Please check your WhatsApp for all 4 messages.');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testMultipleMessages();

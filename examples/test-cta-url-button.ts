import { sendCTAUrlButtonMessage } from '../src/messages';

const RECIPIENT = '919422594226';

async function testCTAUrlButton() {
  console.log('🔗 Testing CTA URL Button Message\n');
  console.log('='.repeat(60));

  try {
    // Send CTA URL Button with Image Header
    console.log('\n📤 Sending CTA URL Button Message...');
    const response = await sendCTAUrlButtonMessage(RECIPIENT, {
      header: {
        type: 'image',
        image: {
          link: 'https://picsum.photos/800/400',
        },
      },
      body: {
        text: 'Check out our latest features! Tap the button below to learn more about BotPe AI Bots.',
      },
      footer: {
        text: 'Powered by BotPe',
      },
      action: {
        name: 'cta_url',
        parameters: {
          display_text: 'Visit BotPe',
          url: 'https://botpe.in?source=whatsapp_cta',
        },
      },
    });

    console.log('   ✅ Queue ID:', response.message.queue_id);
    console.log('   Response:', JSON.stringify(response, null, 2));

    console.log('\n' + '='.repeat(60));
    console.log('✨ CTA URL Button message sent successfully!');
    console.log('📱 Check WhatsApp at', RECIPIENT);
    console.log('='.repeat(60));
  } catch (error: any) {
    console.error('\n❌ Error:', error.message || error);
    if (error.response?.data) {
      console.error('API Response:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testCTAUrlButton();

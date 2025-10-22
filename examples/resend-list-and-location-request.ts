import {
  sendInteractiveListMessage,
  sendInteractiveButtonsMessage,
} from '../src/messages';

const RECIPIENT = '919422594226';

async function resendListAndLocationRequest() {
  console.log('📋 Resending Interactive List message...\n');

  try {
    // 1. RESEND INTERACTIVE LIST MESSAGE
    console.log('1️⃣  Sending INTERACTIVE LIST message...');
    const list = await sendInteractiveListMessage(RECIPIENT, {
      header: {
        type: 'text',
        text: 'Choose a Service 📋',
      },
      body: {
        text: 'Please select the service you need from the list below:',
      },
      footer: {
        text: 'Powered by BotPe AI',
      },
      action: {
        button: 'View Options',
        sections: [
          {
            title: 'Customer Support',
            rows: [
              {
                id: 'support_general',
                title: 'General Support',
                description: 'Get help with general queries',
              },
              {
                id: 'support_technical',
                title: 'Technical Support',
                description: 'Technical assistance',
              },
            ],
          },
          {
            title: 'Sales',
            rows: [
              {
                id: 'sales_inquiry',
                title: 'Product Inquiry',
                description: 'Learn about products',
              },
              {
                id: 'sales_pricing',
                title: 'Pricing Info',
                description: 'Get pricing details',
              },
            ],
          },
        ],
      },
    });
    console.log('   ✅ Queue ID:', list.message.queue_id);
    console.log('');

    await sleep(2000);

    // 2. SEND LOCATION REQUEST MESSAGE
    console.log('2️⃣  Sending LOCATION REQUEST message...');
    const locationRequest = await sendInteractiveButtonsMessage(RECIPIENT, {
      body: {
        text: 'We would like to serve you better! 📍\n\nCould you please share your current location with us? This will help us provide you with more accurate and relevant information.',
      },
      footer: {
        text: 'Tap the button below',
      },
      action: {
        buttons: [
          {
            type: 'reply',
            reply: { id: 'btn_share_location', title: '📍 Share Location' },
          },
          {
            type: 'reply',
            reply: { id: 'btn_skip', title: 'Skip for now' },
          },
        ],
      },
    });
    console.log('   ✅ Queue ID:', locationRequest.message.queue_id);

    console.log('\n' + '='.repeat(60));
    console.log('✨ Messages sent successfully!');
    console.log('📱 Check WhatsApp at', RECIPIENT);
    console.log('='.repeat(60));
  } catch (error: any) {
    console.error('\n❌ Error:', error.message || error);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

resendListAndLocationRequest();

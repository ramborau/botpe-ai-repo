import {
  sendTextMessage,
  sendImageMessage,
  sendVideoMessage,
  sendDocumentMessage,
  sendAudioMessage,
  sendLocationMessage,
  sendContactMessage,
  sendInteractiveListMessage,
  sendInteractiveButtonsMessage,
  sendInteractiveButtonsMediaMessage,
  sendCatalogMessage,
} from '../src/messages';

const RECIPIENT = '919422594226';

async function sendAllMessageTypes() {
  console.log('🚀 Sending ALL Message Types to', RECIPIENT);
  console.log('='.repeat(60) + '\n');

  try {
    // 1. TEXT MESSAGE
    console.log('1️⃣  Sending TEXT message...');
    const text = await sendTextMessage(
      RECIPIENT,
      '*Hello!* This is a _test_ message with *bold* and _italic_ formatting.\n\n- Feature 1\n- Feature 2\n- Feature 3',
      false
    );
    console.log('   ✅ Queue ID:', text.message.queue_id);
    await sleep(2000);

    // 2. IMAGE MESSAGE
    console.log('\n2️⃣  Sending IMAGE message...');
    const image = await sendImageMessage(
      RECIPIENT,
      { link: 'https://picsum.photos/800/600' },
      'Beautiful random image from Picsum! 📸'
    );
    console.log('   ✅ Queue ID:', image.message.queue_id);
    await sleep(2000);

    // 3. VIDEO MESSAGE
    console.log('\n3️⃣  Sending VIDEO message...');
    const video = await sendVideoMessage(
      RECIPIENT,
      { link: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      'Sample video message 🎥'
    );
    console.log('   ✅ Queue ID:', video.message.queue_id);
    await sleep(2000);

    // 4. DOCUMENT MESSAGE
    console.log('\n4️⃣  Sending DOCUMENT message...');
    const document = await sendDocumentMessage(
      RECIPIENT,
      { link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      'Sample PDF document 📄',
      'sample-document.pdf'
    );
    console.log('   ✅ Queue ID:', document.message.queue_id);
    await sleep(2000);

    // 5. AUDIO MESSAGE
    console.log('\n5️⃣  Sending AUDIO message...');
    const audio = await sendAudioMessage(RECIPIENT, {
      link: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    });
    console.log('   ✅ Queue ID:', audio.message.queue_id);
    await sleep(2000);

    // 6. LOCATION MESSAGE
    console.log('\n6️⃣  Sending LOCATION message...');
    const location = await sendLocationMessage(
      RECIPIENT,
      19.0760,
      72.8777,
      'Mumbai, India',
      'Gateway of India, Mumbai, Maharashtra 📍'
    );
    console.log('   ✅ Queue ID:', location.message.queue_id);
    await sleep(2000);

    // 7. CONTACT MESSAGE
    console.log('\n7️⃣  Sending CONTACT message...');
    const contact = await sendContactMessage(RECIPIENT, [
      {
        name: {
          formatted_name: 'BotPe Support',
          first_name: 'BotPe',
          last_name: 'Support',
        },
        phones: [
          {
            phone: '+919876543210',
            type: 'WORK',
          },
        ],
        emails: [
          {
            email: 'support@botpe.in',
            type: 'WORK',
          },
        ],
        org: {
          company: 'BotPe',
          title: 'Customer Support',
        },
      },
    ]);
    console.log('   ✅ Queue ID:', contact.message.queue_id);
    await sleep(2000);

    // 8. INTERACTIVE LIST MESSAGE
    console.log('\n8️⃣  Sending INTERACTIVE LIST message...');
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
    await sleep(2000);

    // 9. INTERACTIVE BUTTONS MESSAGE
    console.log('\n9️⃣  Sending INTERACTIVE BUTTONS message...');
    const buttons = await sendInteractiveButtonsMessage(RECIPIENT, {
      header: {
        type: 'text',
        text: 'Quick Actions',
      },
      body: {
        text: 'How can we help you today? Choose an option:',
      },
      footer: {
        text: 'Select one',
      },
      action: {
        buttons: [
          {
            type: 'reply',
            reply: { id: 'btn_support', title: '🛟 Support' },
          },
          {
            type: 'reply',
            reply: { id: 'btn_sales', title: '💼 Sales' },
          },
          {
            type: 'reply',
            reply: { id: 'btn_info', title: 'ℹ️ Info' },
          },
        ],
      },
    });
    console.log('   ✅ Queue ID:', buttons.message.queue_id);
    await sleep(2000);

    // 10. INTERACTIVE BUTTONS WITH MEDIA MESSAGE
    console.log('\n🔟 Sending INTERACTIVE BUTTONS WITH MEDIA...');
    const mediaButtons = await sendInteractiveButtonsMediaMessage(RECIPIENT, {
      header: {
        type: 'image',
        image: { link: 'https://picsum.photos/800/400' },
      },
      body: {
        text: 'Check out our latest offering! What would you like to do?',
      },
      footer: {
        text: 'Limited time offer',
      },
      action: {
        buttons: [
          {
            type: 'reply',
            reply: { id: 'btn_buy', title: '🛒 Buy Now' },
          },
          {
            type: 'reply',
            reply: { id: 'btn_more', title: '📖 Learn More' },
          },
          {
            type: 'reply',
            reply: { id: 'btn_share', title: '📤 Share' },
          },
        ],
      },
    });
    console.log('   ✅ Queue ID:', mediaButtons.message.queue_id);
    await sleep(2000);

    // 11. CATALOG MESSAGE
    console.log('\n1️⃣1️⃣  Sending CATALOG message...');
    const catalog = await sendCatalogMessage(RECIPIENT, {
      body: {
        text: 'Browse our complete product catalog! 🛍️',
      },
      footer: {
        text: 'Shop now',
      },
      action: {
        name: 'catalog_message',
      },
    });
    console.log('   ✅ Queue ID:', catalog.message.queue_id);

    console.log('\n' + '='.repeat(60));
    console.log('✨ All 11 message types sent successfully!');
    console.log('📱 Check WhatsApp at', RECIPIENT);
    console.log('='.repeat(60));
  } catch (error: any) {
    console.error('\n❌ Error:', error.message || error);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

sendAllMessageTypes();

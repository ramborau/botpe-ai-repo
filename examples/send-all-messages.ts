import {
  sendTextMessage,
  sendImageMessage,
  sendVideoMessage,
  sendDocumentMessage,
  sendAudioMessage,
  sendStickerMessage,
  sendLocationMessage,
  sendContactMessage,
  sendInteractiveListMessage,
  sendInteractiveButtonsMessage,
  sendInteractiveButtonsMediaMessage,
  sendCatalogMessage,
} from '../src/messages';

// Replace with the actual recipient phone number (with country code)
const RECIPIENT_PHONE = '919876543210'; // Example: India number

/**
 * Example functions to demonstrate all message types
 */

// 1. TEXT MESSAGE
async function exampleTextMessage() {
  console.log('📝 Sending text message...');
  const response = await sendTextMessage(
    RECIPIENT_PHONE,
    'Hello! This is a test message from BotPe WhatsApp AI Bot.',
    true // Enable URL preview
  );
  console.log('✅ Text message sent:', response.messages[0].id);
}

// 2. IMAGE MESSAGE
async function exampleImageMessage() {
  console.log('🖼️  Sending image message...');
  const response = await sendImageMessage(
    RECIPIENT_PHONE,
    {
      link: 'https://picsum.photos/800/600', // Example image URL
    },
    'Here is a beautiful random image!'
  );
  console.log('✅ Image message sent:', response.messages[0].id);
}

// 3. VIDEO MESSAGE
async function exampleVideoMessage() {
  console.log('🎥 Sending video message...');
  const response = await sendVideoMessage(
    RECIPIENT_PHONE,
    {
      link: 'https://www.w3schools.com/html/mov_bbb.mp4', // Example video URL
    },
    'Check out this video!'
  );
  console.log('✅ Video message sent:', response.messages[0].id);
}

// 4. DOCUMENT MESSAGE
async function exampleDocumentMessage() {
  console.log('📄 Sending document message...');
  const response = await sendDocumentMessage(
    RECIPIENT_PHONE,
    {
      link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    'Here is a sample document',
    'sample-document.pdf'
  );
  console.log('✅ Document message sent:', response.messages[0].id);
}

// 5. AUDIO MESSAGE
async function exampleAudioMessage() {
  console.log('🎵 Sending audio message...');
  const response = await sendAudioMessage(RECIPIENT_PHONE, {
    link: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  });
  console.log('✅ Audio message sent:', response.messages[0].id);
}

// 6. LOCATION MESSAGE
async function exampleLocationMessage() {
  console.log('📍 Sending location message...');
  const response = await sendLocationMessage(
    RECIPIENT_PHONE,
    28.6139, // Latitude (New Delhi)
    77.209, // Longitude
    'India Gate',
    'Rajpath, New Delhi, India'
  );
  console.log('✅ Location message sent:', response.messages[0].id);
}

// 7. CONTACT MESSAGE
async function exampleContactMessage() {
  console.log('👤 Sending contact message...');
  const response = await sendContactMessage(RECIPIENT_PHONE, [
    {
      name: {
        formatted_name: 'John Doe',
        first_name: 'John',
        last_name: 'Doe',
      },
      phones: [
        {
          phone: '+1234567890',
          type: 'CELL',
        },
      ],
      emails: [
        {
          email: 'john.doe@example.com',
          type: 'WORK',
        },
      ],
      org: {
        company: 'BotPe Inc.',
        title: 'Software Engineer',
      },
    },
  ]);
  console.log('✅ Contact message sent:', response.messages[0].id);
}

// 8. INTERACTIVE LIST MESSAGE
async function exampleInteractiveListMessage() {
  console.log('📋 Sending interactive list message...');
  const response = await sendInteractiveListMessage(RECIPIENT_PHONE, {
    header: {
      type: 'text',
      text: 'Choose Your Service',
    },
    body: {
      text: 'Please select the service you need from the list below:',
    },
    footer: {
      text: 'Powered by BotPe AI',
    },
    action: {
      button: 'View Services',
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
              description: 'Get help with technical issues',
            },
          ],
        },
        {
          title: 'Sales',
          rows: [
            {
              id: 'sales_inquiry',
              title: 'Product Inquiry',
              description: 'Learn about our products',
            },
            {
              id: 'sales_pricing',
              title: 'Pricing',
              description: 'Get pricing information',
            },
          ],
        },
      ],
    },
  });
  console.log('✅ Interactive list message sent:', response.messages[0].id);
}

// 9. INTERACTIVE BUTTONS MESSAGE
async function exampleInteractiveButtonsMessage() {
  console.log('🔘 Sending interactive buttons message...');
  const response = await sendInteractiveButtonsMessage(RECIPIENT_PHONE, {
    header: {
      type: 'text',
      text: 'Quick Actions',
    },
    body: {
      text: 'How can we help you today?',
    },
    footer: {
      text: 'Choose one option',
    },
    action: {
      buttons: [
        {
          type: 'reply',
          reply: {
            id: 'btn_support',
            title: 'Support',
          },
        },
        {
          type: 'reply',
          reply: {
            id: 'btn_sales',
            title: 'Sales',
          },
        },
        {
          type: 'reply',
          reply: {
            id: 'btn_info',
            title: 'Information',
          },
        },
      ],
    },
  });
  console.log('✅ Interactive buttons message sent:', response.messages[0].id);
}

// 10. INTERACTIVE BUTTONS WITH MEDIA MESSAGE
async function exampleInteractiveButtonsMediaMessage() {
  console.log('🔘🖼️  Sending interactive buttons with media message...');
  const response = await sendInteractiveButtonsMediaMessage(RECIPIENT_PHONE, {
    header: {
      type: 'image',
      image: {
        link: 'https://picsum.photos/800/400',
      },
    },
    body: {
      text: 'Check out our latest product! What would you like to do?',
    },
    footer: {
      text: 'Limited time offer',
    },
    action: {
      buttons: [
        {
          type: 'reply',
          reply: {
            id: 'btn_buy',
            title: 'Buy Now',
          },
        },
        {
          type: 'reply',
          reply: {
            id: 'btn_more',
            title: 'Learn More',
          },
        },
        {
          type: 'reply',
          reply: {
            id: 'btn_share',
            title: 'Share',
          },
        },
      ],
    },
  });
  console.log('✅ Interactive buttons with media sent:', response.messages[0].id);
}

// 11. CATALOG MESSAGE
async function exampleCatalogMessage() {
  console.log('🛍️  Sending catalog message...');
  const response = await sendCatalogMessage(RECIPIENT_PHONE, {
    body: {
      text: 'Check out our product catalog!',
    },
    footer: {
      text: 'Browse and shop',
    },
    action: {
      name: 'catalog_message',
    },
  });
  console.log('✅ Catalog message sent:', response.messages[0].id);
}

/**
 * Main function to run all examples
 * Comment out the ones you don't want to test
 */
async function main() {
  try {
    console.log('🚀 Starting BotPe WhatsApp Message Examples\n');
    console.log(`📱 Sending to: ${RECIPIENT_PHONE}\n`);

    // Uncomment the examples you want to test:

    await exampleTextMessage();
    console.log('');

    // await exampleImageMessage();
    // console.log('');

    // await exampleVideoMessage();
    // console.log('');

    // await exampleDocumentMessage();
    // console.log('');

    // await exampleAudioMessage();
    // console.log('');

    // await exampleLocationMessage();
    // console.log('');

    // await exampleContactMessage();
    // console.log('');

    // await exampleInteractiveListMessage();
    // console.log('');

    // await exampleInteractiveButtonsMessage();
    // console.log('');

    // await exampleInteractiveButtonsMediaMessage();
    // console.log('');

    // await exampleCatalogMessage();
    // console.log('');

    console.log('✨ All examples completed successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main();
}

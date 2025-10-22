import axios from 'axios';

/**
 * Test script to simulate webhook events
 * This sends test webhook payloads to your local webhook server
 */

const WEBHOOK_URL = 'http://localhost:3000/webhook';

// Simulate incoming text message
async function testIncomingTextMessage() {
  console.log('📨 Testing incoming text message...');

  const payload = {
    event_type: 'message',
    id: 'test-msg-' + Date.now(),
    from: '919422594226',
    to: '353200837885879',
    type: 'text',
    timestamp: Date.now(),
    text: {
      body: 'Hello! This is a test message from the webhook simulator.',
    },
  };

  try {
    const response = await axios.post(WEBHOOK_URL, payload);
    console.log('✅ Response:', response.status, response.statusText);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

// Simulate incoming image message
async function testIncomingImageMessage() {
  console.log('🖼️  Testing incoming image message...');

  const payload = {
    event_type: 'message',
    id: 'test-img-' + Date.now(),
    from: '919422594226',
    to: '353200837885879',
    type: 'image',
    timestamp: Date.now(),
    image: {
      id: 'image-123',
      mime_type: 'image/jpeg',
      caption: 'Check out this photo!',
      sha256: 'abc123',
    },
  };

  try {
    const response = await axios.post(WEBHOOK_URL, payload);
    console.log('✅ Response:', response.status, response.statusText);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

// Simulate button click response
async function testButtonResponse() {
  console.log('🔘 Testing button click response...');

  const payload = {
    event_type: 'interactive',
    id: 'test-btn-' + Date.now(),
    from: '919422594226',
    to: '353200837885879',
    type: 'interactive',
    timestamp: Date.now(),
    interactive: {
      type: 'button_reply',
      button_reply: {
        id: 'support',
        title: 'Support',
      },
    },
  };

  try {
    const response = await axios.post(WEBHOOK_URL, payload);
    console.log('✅ Response:', response.status, response.statusText);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

// Simulate list selection response
async function testListResponse() {
  console.log('📋 Testing list selection response...');

  const payload = {
    event_type: 'interactive',
    id: 'test-list-' + Date.now(),
    from: '919422594226',
    to: '353200837885879',
    type: 'interactive',
    timestamp: Date.now(),
    interactive: {
      type: 'list_reply',
      list_reply: {
        id: 'support_technical',
        title: 'Technical Support',
      },
    },
  };

  try {
    const response = await axios.post(WEBHOOK_URL, payload);
    console.log('✅ Response:', response.status, response.statusText);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

// Simulate message status update
async function testMessageStatus() {
  console.log('📊 Testing message status update...');

  const payload = {
    event_type: 'message_status',
    id: 'test-queue-123',
    status: 'delivered',
    timestamp: Date.now(),
  };

  try {
    const response = await axios.post(WEBHOOK_URL, payload);
    console.log('✅ Response:', response.status, response.statusText);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

// Main test runner
async function runTests() {
  console.log('\n🧪 Webhook Test Suite\n');
  console.log('Make sure webhook server is running: npm run webhook\n');
  console.log('='.repeat(60) + '\n');

  await testIncomingTextMessage();
  console.log('');

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await testIncomingImageMessage();
  console.log('');

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await testButtonResponse();
  console.log('');

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await testListResponse();
  console.log('');

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await testMessageStatus();
  console.log('');

  console.log('='.repeat(60));
  console.log('\n✨ All tests completed!\n');
  console.log('Check the webhook server console for detailed logs.');
  console.log('View database stats: http://localhost:3000/stats');
  console.log('View messages: http://localhost:3000/messages\n');
}

runTests();

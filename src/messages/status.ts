import axios from 'axios';
import { config } from '../config/env';

/**
 * Mark a message as read
 * @param messageId - WhatsApp message ID to mark as read
 */
export async function markMessageAsRead(messageId: string): Promise<any> {
  const payload = {
    messaging_product: 'whatsapp',
    status: 'read',
    message_id: messageId,
  };

  try {
    const response = await axios.post(
      `${config.baseUrl}/${config.version}/${config.businessPhoneNumberId}/messages`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`API Error: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}

/**
 * Send typing indicator
 * @param recipientPhone - Recipient phone number
 * @param typing - true to show typing, false to hide
 */
export async function sendTypingIndicator(
  recipientPhone: string,
  typing: boolean = true
): Promise<any> {
  const payload: any = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: recipientPhone,
    typing: typing ? 'on' : 'off',
  };

  try {
    const response = await axios.post(
      `${config.baseUrl}/${config.version}/${config.businessPhoneNumberId}/messages`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`API Error: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}

/**
 * Mark message as read AND send typing indicator (combined in one call)
 * @param messageId - WhatsApp message ID to mark as read
 */
export async function markReadAndStartTyping(
  messageId: string
): Promise<any> {
  const payload = {
    messaging_product: 'whatsapp',
    status: 'read',
    message_id: messageId,
    typing_indicator: {
      type: 'text',
    },
  };

  try {
    const response = await axios.post(
      `${config.baseUrl}/${config.version}/${config.businessPhoneNumberId}/messages`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`API Error: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}

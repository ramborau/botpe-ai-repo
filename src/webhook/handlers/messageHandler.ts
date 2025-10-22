import { saveIncomingMessage } from '../../database/operations';
import { logIncomingMessage, logError } from '../../utils/logger';
import { handleDoctorAppointmentBot, hasActiveSession } from '../../bot/doctor-appointment-bot';
import { config2 } from '../../config/env';

/**
 * Handle incoming WhatsApp messages
 */
export async function handleIncomingMessage(webhookData: any): Promise<void> {
  try {
    // Log the incoming message
    logIncomingMessage(webhookData);

    // Extract message details from webhook payload
    const { from, to, type, timestamp, id } = webhookData;

    // Extract contact name if available (from Meta's webhook format)
    let contactName = 'Unknown';
    if (webhookData.contacts && Array.isArray(webhookData.contacts)) {
      const contact = webhookData.contacts.find((c: any) => c.wa_id === from);
      if (contact?.profile?.name) {
        contactName = contact.profile.name;
      }
    }

    // Check if this is for Number 2 and trigger bot if needed
    const isNumber2 = to === config2.businessPhoneNumberId;
    const triggerText = webhookData.text?.body?.toLowerCase();

    if (isNumber2 && (triggerText === 'dr1' || hasActiveSession(from))) {
      // Route to doctor appointment bot
      await handleDoctorAppointmentBot(from, type, webhookData, contactName);
    }

    // Parse message content based on type
    let content: any = {
      contactName, // Include contact name in all messages
    };

    switch (type) {
      case 'text':
        content.text = webhookData.text?.body;
        break;

      case 'image':
        content.id = webhookData.image?.id;
        content.mimeType = webhookData.image?.mime_type;
        content.caption = webhookData.image?.caption;
        content.sha256 = webhookData.image?.sha256;
        break;

      case 'video':
        content.id = webhookData.video?.id;
        content.mimeType = webhookData.video?.mime_type;
        content.caption = webhookData.video?.caption;
        content.sha256 = webhookData.video?.sha256;
        break;

      case 'document':
        content.id = webhookData.document?.id;
        content.filename = webhookData.document?.filename;
        content.mimeType = webhookData.document?.mime_type;
        content.caption = webhookData.document?.caption;
        content.sha256 = webhookData.document?.sha256;
        break;

      case 'audio':
        content.id = webhookData.audio?.id;
        content.mimeType = webhookData.audio?.mime_type;
        content.sha256 = webhookData.audio?.sha256;
        break;

      case 'sticker':
        content.id = webhookData.sticker?.id;
        content.mimeType = webhookData.sticker?.mime_type;
        content.sha256 = webhookData.sticker?.sha256;
        break;

      case 'location':
        content.latitude = webhookData.location?.latitude;
        content.longitude = webhookData.location?.longitude;
        content.locationName = webhookData.location?.name;
        content.address = webhookData.location?.address;
        break;

      case 'contacts':
        content.contacts = webhookData.contacts;
        break;

      default:
        content.rawData = webhookData;
    }

    // Save to database
    // Convert timestamp to number (Meta sends it as string)
    const timestampNum = typeof timestamp === 'string' ? parseInt(timestamp) * 1000 : (timestamp || Date.now());

    const messageId = saveIncomingMessage({
      queueId: id,
      fromNumber: from,
      toNumber: to,
      messageType: type,
      content,
      timestamp: timestampNum,
    });

    console.log(`✅ Message saved to database with ID: ${messageId}`);
  } catch (error) {
    logError('Error handling incoming message', error);
    throw error;
  }
}

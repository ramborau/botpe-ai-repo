import { saveInteractiveResponse } from '../../database/operations';
import { logInteractiveResponse, logError } from '../../utils/logger';
import { handleDoctorAppointmentBot, hasActiveSession } from '../../bot/doctor-appointment-bot';
import { config2 } from '../../config/env';

/**
 * Handle interactive message responses (button clicks, list selections)
 */
export async function handleInteractiveResponse(webhookData: any): Promise<void> {
  try {
    // Log the interactive response
    logInteractiveResponse(webhookData);

    const { from, to, timestamp, interactive } = webhookData;

    // Extract contact name if available
    let contactName = 'Unknown';
    if (webhookData.contacts && Array.isArray(webhookData.contacts)) {
      const contact = webhookData.contacts.find((c: any) => c.wa_id === from);
      if (contact?.profile?.name) {
        contactName = contact.profile.name;
      }
    }

    // Check if this is for Number 2 and user has active bot session
    const isNumber2 = to === config2.businessPhoneNumberId;
    if (isNumber2 && hasActiveSession(from)) {
      // Route to doctor appointment bot
      await handleDoctorAppointmentBot(from, 'interactive', interactive, contactName);
    }

    let responseType = '';
    let responseId = '';
    let responseTitle = '';

    // Check if it's a button reply or list reply
    if (interactive.type === 'button_reply') {
      responseType = 'button_reply';
      responseId = interactive.button_reply?.id;
      responseTitle = interactive.button_reply?.title;
    } else if (interactive.type === 'list_reply') {
      responseType = 'list_reply';
      responseId = interactive.list_reply?.id;
      responseTitle = interactive.list_reply?.title;
    }

    // Save to database
    const interactionId = saveInteractiveResponse({
      queueId: webhookData.id,
      userNumber: from,
      responseType,
      responseId,
      responseTitle,
      responseData: interactive,
      timestamp: timestamp || Date.now(),
    });

    console.log(
      `✅ Interactive response saved: User ${from} selected "${responseTitle}" (ID: ${interactionId})`
    );
  } catch (error) {
    logError('Error handling interactive response', error);
    throw error;
  }
}

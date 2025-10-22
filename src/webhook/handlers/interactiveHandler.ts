import { saveInteractiveResponse } from '../../database/operations';
import { logInteractiveResponse, logError } from '../../utils/logger';

/**
 * Handle interactive message responses (button clicks, list selections)
 */
export async function handleInteractiveResponse(webhookData: any): Promise<void> {
  try {
    // Log the interactive response
    logInteractiveResponse(webhookData);

    const { from, timestamp, interactive } = webhookData;

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

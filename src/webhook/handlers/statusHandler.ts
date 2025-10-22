import { updateMessageStatus } from '../../database/operations';
import { logMessageStatus, logError } from '../../utils/logger';

/**
 * Handle message status updates
 * Status types: sent, delivered, read, failed
 */
export async function handleMessageStatus(webhookData: any): Promise<void> {
  try {
    // Log the status update
    logMessageStatus(webhookData);

    const { id, status, timestamp, error } = webhookData;

    // Save to database
    updateMessageStatus({
      queueId: id,
      status: status,
      timestamp: timestamp || Date.now(),
      errorMessage: error?.message,
    });

    console.log(`✅ Status updated for message ${id}: ${status}`);
  } catch (error) {
    logError('Error handling message status', error);
    throw error;
  }
}

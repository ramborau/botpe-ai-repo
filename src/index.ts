// Export all message sending functions (Number 1)
export {
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
  sendLocationRequestMessage,
  sendCTAUrlButtonMessage,
  sendVoiceCallRequestMessage,
} from './messages';

// Export all message sending functions (Number 2)
export {
  sendTextMessage2,
  sendImageMessage2,
  sendVideoMessage2,
  sendDocumentMessage2,
  sendAudioMessage2,
  sendStickerMessage2,
  sendLocationMessage2,
  sendContactMessage2,
  sendInteractiveListMessage2,
  sendInteractiveButtonsMessage2,
  sendInteractiveButtonsMediaMessage2,
  sendCatalogMessage2,
  sendLocationRequestMessage2,
  sendCTAUrlButtonMessage2,
  sendVoiceCallRequestMessage2,
} from './messages/index2';

// Export status functions (read receipts, typing indicators)
export {
  markMessageAsRead,
  sendTypingIndicator,
  markReadAndStartTyping,
} from './messages/status';

// Export types
export * from './types/messages';

// Export API clients for advanced usage
export { BotPeAPIClient, apiClient } from './client/api-client';
export { BotPeAPIClient2, apiClient2 } from './client/api-client2';
export { config, config2 } from './config/env';

import { apiClient } from '../client/api-client';
import {
  MessageResponse,
  TextMessage,
  ImageMessage,
  VideoMessage,
  DocumentMessage,
  AudioMessage,
  StickerMessage,
  LocationMessage,
  Contact,
  InteractiveListMessage,
  InteractiveButtonsMessage,
  InteractiveButtonsMediaMessage,
  CatalogMessage,
  LocationRequestMessage,
  CTAUrlButtonMessage,
  VoiceCallRequestMessage,
} from '../types/messages';

/**
 * Send a text message
 * @param to - Recipient phone number (with country code, e.g., "919876543210")
 * @param body - Text message content
 * @param previewUrl - Whether to show URL preview (default: false)
 */
export async function sendTextMessage(
  to: string,
  body: string,
  previewUrl: boolean = false
): Promise<MessageResponse> {
  const textMessage: TextMessage = {
    body,
    preview_url: previewUrl,
  };

  return apiClient.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'text',
    text: textMessage,
  });
}

/**
 * Send an image message
 * @param to - Recipient phone number
 * @param image - Image object with either id or link
 * @param caption - Optional image caption
 */
export async function sendImageMessage(
  to: string,
  image: { id?: string; link?: string },
  caption?: string
): Promise<MessageResponse> {
  const imageMessage: ImageMessage = {
    ...image,
    caption,
  };

  return apiClient.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'image',
    image: imageMessage,
  });
}

/**
 * Send a video message
 * @param to - Recipient phone number
 * @param video - Video object with either id or link
 * @param caption - Optional video caption
 */
export async function sendVideoMessage(
  to: string,
  video: { id?: string; link?: string },
  caption?: string
): Promise<MessageResponse> {
  const videoMessage: VideoMessage = {
    ...video,
    caption,
  };

  return apiClient.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'video',
    video: videoMessage,
  });
}

/**
 * Send a document message
 * @param to - Recipient phone number
 * @param document - Document object with either id or link
 * @param caption - Optional document caption
 * @param filename - Optional filename
 */
export async function sendDocumentMessage(
  to: string,
  document: { id?: string; link?: string },
  caption?: string,
  filename?: string
): Promise<MessageResponse> {
  const documentMessage: DocumentMessage = {
    ...document,
    caption,
    filename,
  };

  return apiClient.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'document',
    document: documentMessage,
  });
}

/**
 * Send an audio message
 * @param to - Recipient phone number
 * @param audio - Audio object with either id or link
 */
export async function sendAudioMessage(
  to: string,
  audio: { id?: string; link?: string }
): Promise<MessageResponse> {
  const audioMessage: AudioMessage = {
    ...audio,
  };

  return apiClient.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'audio',
    audio: audioMessage,
  });
}

/**
 * Send a sticker message
 * @param to - Recipient phone number
 * @param sticker - Sticker object with either id or link
 */
export async function sendStickerMessage(
  to: string,
  sticker: { id?: string; link?: string }
): Promise<MessageResponse> {
  const stickerMessage: StickerMessage = {
    ...sticker,
  };

  return apiClient.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'sticker',
    sticker: stickerMessage,
  });
}

/**
 * Send a location message
 * @param to - Recipient phone number
 * @param latitude - Location latitude
 * @param longitude - Location longitude
 * @param name - Optional location name
 * @param address - Optional location address
 */
export async function sendLocationMessage(
  to: string,
  latitude: number,
  longitude: number,
  name?: string,
  address?: string
): Promise<MessageResponse> {
  const locationMessage: LocationMessage = {
    latitude,
    longitude,
    name,
    address,
  };

  return apiClient.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'location',
    location: locationMessage,
  });
}

/**
 * Send a contact message
 * @param to - Recipient phone number
 * @param contacts - Array of contact objects
 */
export async function sendContactMessage(
  to: string,
  contacts: Contact[]
): Promise<MessageResponse> {
  return apiClient.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'contacts',
    contacts,
  });
}

/**
 * Send an interactive list message
 * @param to - Recipient phone number
 * @param interactive - Interactive list message object
 */
export async function sendInteractiveListMessage(
  to: string,
  interactive: InteractiveListMessage
): Promise<MessageResponse> {
  return apiClient.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'interactive',
    interactive: {
      type: 'list',
      ...interactive,
    } as any,
  });
}

/**
 * Send an interactive buttons message
 * @param to - Recipient phone number
 * @param interactive - Interactive buttons message object
 */
export async function sendInteractiveButtonsMessage(
  to: string,
  interactive: InteractiveButtonsMessage
): Promise<MessageResponse> {
  return apiClient.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'interactive',
    interactive: {
      type: 'button',
      ...interactive,
    } as any,
  });
}

/**
 * Send an interactive buttons with media message
 * @param to - Recipient phone number
 * @param interactive - Interactive buttons with media message object
 */
export async function sendInteractiveButtonsMediaMessage(
  to: string,
  interactive: InteractiveButtonsMediaMessage
): Promise<MessageResponse> {
  return apiClient.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'interactive',
    interactive: {
      type: 'button',
      ...interactive,
    } as any,
  });
}

/**
 * Send a catalog message
 * @param to - Recipient phone number
 * @param catalog - Catalog message object
 */
export async function sendCatalogMessage(
  to: string,
  catalog: CatalogMessage
): Promise<MessageResponse> {
  return apiClient.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'interactive',
    interactive: {
      type: 'catalog_message',
      ...catalog,
    } as any,
  });
}

/**
 * Send a location request message (asks user to share their location)
 * @param to - Recipient phone number
 * @param bodyText - Message text asking for location
 */
export async function sendLocationRequestMessage(
  to: string,
  bodyText: string
): Promise<MessageResponse> {
  const locationRequest: LocationRequestMessage = {
    body: {
      text: bodyText,
    },
    action: {
      name: 'send_location',
    },
  };

  return apiClient.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'interactive',
    interactive: {
      type: 'location_request_message',
      ...locationRequest,
    } as any,
  });
}

/**
 * Send a CTA URL button message (Call-to-Action with URL)
 * @param to - Recipient phone number
 * @param ctaButton - CTA URL button message object
 */
export async function sendCTAUrlButtonMessage(
  to: string,
  ctaButton: CTAUrlButtonMessage
): Promise<MessageResponse> {
  return apiClient.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'interactive',
    interactive: {
      type: 'cta_url',
      ...ctaButton,
    } as any,
  });
}

/**
 * Send a voice call request message (initiates WhatsApp call)
 * @param to - Recipient phone number
 * @param bodyText - Message text
 * @param displayText - Button text
 * @param ttlMinutes - Optional time to live in minutes
 * @param payload - Optional payload data
 */
export async function sendVoiceCallRequestMessage(
  to: string,
  bodyText: string,
  displayText: string,
  ttlMinutes?: number,
  payload?: string
): Promise<MessageResponse> {
  const voiceCallRequest: VoiceCallRequestMessage = {
    body: {
      text: bodyText,
    },
    action: {
      name: 'voice_call',
      parameters: {
        display_text: displayText,
        ...(ttlMinutes && { ttl_minutes: ttlMinutes }),
        ...(payload && { payload }),
      },
    },
  };

  return apiClient.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'interactive',
    interactive: {
      type: 'voice_call',
      ...voiceCallRequest,
    } as any,
  });
}

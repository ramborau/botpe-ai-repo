/**
 * Message sending functions for Second WhatsApp Number
 * All functions mirror index.ts but use apiClient2
 */

import { apiClient2 } from '../client/api-client2';
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
 * Send a text message (Number 2)
 */
export async function sendTextMessage2(
  to: string,
  body: string,
  previewUrl: boolean = false
): Promise<MessageResponse> {
  const textMessage: TextMessage = {
    body,
    preview_url: previewUrl,
  };

  return apiClient2.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'text',
    text: textMessage,
  });
}

/**
 * Send an image message (Number 2)
 */
export async function sendImageMessage2(
  to: string,
  image: { id?: string; link?: string },
  caption?: string
): Promise<MessageResponse> {
  const imageMessage: ImageMessage = {
    ...image,
    caption,
  };

  return apiClient2.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'image',
    image: imageMessage,
  });
}

/**
 * Send a video message (Number 2)
 */
export async function sendVideoMessage2(
  to: string,
  video: { id?: string; link?: string },
  caption?: string
): Promise<MessageResponse> {
  const videoMessage: VideoMessage = {
    ...video,
    caption,
  };

  return apiClient2.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'video',
    video: videoMessage,
  });
}

/**
 * Send a document message (Number 2)
 */
export async function sendDocumentMessage2(
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

  return apiClient2.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'document',
    document: documentMessage,
  });
}

/**
 * Send an audio message (Number 2)
 */
export async function sendAudioMessage2(
  to: string,
  audio: { id?: string; link?: string }
): Promise<MessageResponse> {
  const audioMessage: AudioMessage = {
    ...audio,
  };

  return apiClient2.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'audio',
    audio: audioMessage,
  });
}

/**
 * Send a sticker message (Number 2)
 */
export async function sendStickerMessage2(
  to: string,
  sticker: { id?: string; link?: string }
): Promise<MessageResponse> {
  const stickerMessage: StickerMessage = {
    ...sticker,
  };

  return apiClient2.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'sticker',
    sticker: stickerMessage,
  });
}

/**
 * Send a location message (Number 2)
 */
export async function sendLocationMessage2(
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

  return apiClient2.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'location',
    location: locationMessage,
  });
}

/**
 * Send a contact message (Number 2)
 */
export async function sendContactMessage2(
  to: string,
  contacts: Contact[]
): Promise<MessageResponse> {
  return apiClient2.sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'contacts',
    contacts,
  });
}

/**
 * Send an interactive list message (Number 2)
 */
export async function sendInteractiveListMessage2(
  to: string,
  interactive: InteractiveListMessage
): Promise<MessageResponse> {
  return apiClient2.sendMessage({
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
 * Send an interactive buttons message (Number 2)
 */
export async function sendInteractiveButtonsMessage2(
  to: string,
  interactive: InteractiveButtonsMessage
): Promise<MessageResponse> {
  return apiClient2.sendMessage({
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
 * Send an interactive buttons with media message (Number 2)
 */
export async function sendInteractiveButtonsMediaMessage2(
  to: string,
  interactive: InteractiveButtonsMediaMessage
): Promise<MessageResponse> {
  return apiClient2.sendMessage({
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
 * Send a catalog message (Number 2)
 */
export async function sendCatalogMessage2(
  to: string,
  catalog: CatalogMessage
): Promise<MessageResponse> {
  return apiClient2.sendMessage({
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
 * Send a location request message (Number 2)
 */
export async function sendLocationRequestMessage2(
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

  return apiClient2.sendMessage({
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
 * Send a CTA URL button message (Number 2)
 */
export async function sendCTAUrlButtonMessage2(
  to: string,
  ctaButton: CTAUrlButtonMessage
): Promise<MessageResponse> {
  return apiClient2.sendMessage({
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
 * Send a voice call request message (Number 2)
 */
export async function sendVoiceCallRequestMessage2(
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

  return apiClient2.sendMessage({
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

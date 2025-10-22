// Common types - BotPe API Response Format
export interface MessageResponse {
  messaging_channel: string;
  message: {
    queue_id: string;
    message_status: 'queued' | 'sent' | 'failed';
  };
}

export interface MediaObject {
  id?: string;
  link?: string;
}

// Text Message
export interface TextMessage {
  preview_url?: boolean;
  body: string;
}

// Image Message
export interface ImageMessage {
  id?: string;
  link?: string;
  caption?: string;
}

// Video Message
export interface VideoMessage {
  id?: string;
  link?: string;
  caption?: string;
}

// Document Message
export interface DocumentMessage {
  id?: string;
  link?: string;
  caption?: string;
  filename?: string;
}

// Audio Message
export interface AudioMessage {
  id?: string;
  link?: string;
}

// Sticker Message
export interface StickerMessage {
  id?: string;
  link?: string;
}

// Location Message
export interface LocationMessage {
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
}

// Contact Message - Address
export interface ContactAddress {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  country_code?: string;
  type?: 'HOME' | 'WORK';
}

// Contact Message - Email
export interface ContactEmail {
  email?: string;
  type?: 'HOME' | 'WORK';
}

// Contact Message - Name
export interface ContactName {
  formatted_name: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  suffix?: string;
  prefix?: string;
}

// Contact Message - Organization
export interface ContactOrg {
  company?: string;
  department?: string;
  title?: string;
}

// Contact Message - Phone
export interface ContactPhone {
  phone?: string;
  wa_id?: string;
  type?: 'HOME' | 'WORK' | 'CELL' | 'MAIN' | 'IPHONE';
}

// Contact Message - URL
export interface ContactUrl {
  url?: string;
  type?: 'HOME' | 'WORK';
}

// Contact Message - Full Contact
export interface Contact {
  addresses?: ContactAddress[];
  birthday?: string;
  emails?: ContactEmail[];
  name: ContactName;
  org?: ContactOrg;
  phones?: ContactPhone[];
  urls?: ContactUrl[];
}

export interface ContactMessage {
  contacts: Contact[];
}

// Interactive List Message
export interface ListRow {
  id: string;
  title: string;
  description?: string;
}

export interface ListSection {
  title?: string;
  rows: ListRow[];
}

export interface InteractiveListMessage {
  header?: {
    type: 'text';
    text: string;
  };
  body: {
    text: string;
  };
  footer?: {
    text: string;
  };
  action: {
    button: string;
    sections: ListSection[];
  };
}

// Interactive Buttons Message
export interface ReplyButton {
  type: 'reply';
  reply: {
    id: string;
    title: string;
  };
}

export interface InteractiveButtonsMessage {
  header?: {
    type: 'text';
    text: string;
  };
  body: {
    text: string;
  };
  footer?: {
    text: string;
  };
  action: {
    buttons: ReplyButton[];
  };
}

// Interactive Buttons with Media Message
export interface InteractiveButtonsMediaMessage {
  header: {
    type: 'image' | 'video' | 'document';
    image?: MediaObject;
    video?: MediaObject;
    document?: MediaObject & { filename?: string };
  };
  body: {
    text: string;
  };
  footer?: {
    text: string;
  };
  action: {
    buttons: ReplyButton[];
  };
}

// Catalog Message
export interface CatalogMessage {
  body?: {
    text: string;
  };
  footer?: {
    text: string;
  };
  action: {
    name: 'catalog_message';
    parameters?: {
      thumbnail_product_retailer_id?: string;
    };
  };
}

// Location Request Message
export interface LocationRequestMessage {
  body: {
    text: string;
  };
  action: {
    name: 'send_location';
  };
}

// CTA URL Button Message
export interface CTAUrlButtonMessage {
  header?: {
    type: 'text' | 'image' | 'video' | 'document';
    text?: string;
    image?: MediaObject;
    video?: MediaObject;
    document?: MediaObject & { filename?: string };
  };
  body: {
    text: string;
  };
  footer?: {
    text: string;
  };
  action: {
    name: 'cta_url';
    parameters: {
      display_text: string;
      url: string;
    };
  };
}

// Voice Call Request Message
export interface VoiceCallRequestMessage {
  body: {
    text: string;
  };
  action: {
    name: 'voice_call';
    parameters: {
      display_text: string;
      ttl_minutes?: number;
      payload?: string;
    };
  };
}

// Generic Message Request
export interface MessageRequest {
  messaging_product: 'whatsapp';
  recipient_type?: 'individual';
  to: string;
  type: string;
  text?: TextMessage;
  image?: ImageMessage;
  video?: VideoMessage;
  document?: DocumentMessage;
  audio?: AudioMessage;
  sticker?: StickerMessage;
  location?: LocationMessage;
  contacts?: Contact[];
  interactive?: InteractiveListMessage | InteractiveButtonsMessage | InteractiveButtonsMediaMessage | CatalogMessage;
}

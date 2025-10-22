/**
 * WhatsApp Message Constraints
 * All character limits are defined here
 */

export const CONSTRAINTS = {
  // Text Messages
  TEXT_BODY: 4096, // Maximum characters for text message body

  // Interactive Buttons
  BUTTON_TITLE: 20, // Maximum characters for button title
  BUTTON_HEADER_TEXT: 60, // Maximum characters for button header text

  // Interactive Lists
  LIST_ROW_TITLE: 24, // Maximum characters for list row title
  LIST_SECTION_TITLE: 24, // Maximum characters for list section title
  LIST_ROW_DESCRIPTION: 72, // Maximum characters for list row description
  LIST_MAX_ROWS: 10, // Maximum number of rows across all sections

  // Footer (All message types)
  FOOTER_TEXT: 60, // Maximum characters for footer

  // Media Captions (image, video, audio, document)
  MEDIA_CAPTION: 1024, // Maximum characters for media caption

  // File Sizes (in MB)
  IMAGE_SIZE_MB: 5,
  VIDEO_SIZE_MB: 16,
  AUDIO_SIZE_MB: 16,
  DOCUMENT_SIZE_MB: 100,
} as const;

/**
 * WhatsApp Formatting
 */
export const FORMATTING = {
  BOLD: {
    syntax: '*text*',
    example: '*Hello*',
  },
  ITALIC: {
    syntax: '_text_',
    example: '_Hello, World!_',
  },
  BULLETED_LIST: {
    syntax: '- Item',
    example: '- Item 1\n- Item 2',
  },
} as const;

/**
 * Supported header types for interactive buttons
 */
export const BUTTON_HEADER_TYPES = ['text', 'image', 'video', 'document'] as const;

/**
 * Supported message types
 */
export const MESSAGE_TYPES = [
  'text',
  'image',
  'video',
  'document',
  'audio',
  'sticker',
  'location',
  'contacts',
  'interactive',
] as const;

/**
 * Interactive message types
 */
export const INTERACTIVE_TYPES = ['list', 'button', 'catalog_message'] as const;

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export interface BotPeConfig {
  baseUrl: string;
  version: string;
  businessPhoneNumberId: string;
  token: string;
}

export const getConfig = (): BotPeConfig => {
  const baseUrl = process.env.BASE_URL;
  const version = process.env.VERSION;
  const businessPhoneNumberId = process.env.BUSINESS_PHONE_NUMBER_ID;
  const token = process.env.TOKEN;

  if (!baseUrl || !version || !businessPhoneNumberId || !token) {
    throw new Error(
      'Missing required environment variables. Please check your .env file.'
    );
  }

  return {
    baseUrl,
    version,
    businessPhoneNumberId,
    token,
  };
};

export const getConfig2 = (): BotPeConfig => {
  const baseUrl = process.env.BASE_URL;
  const version = process.env.VERSION;
  const businessPhoneNumberId = process.env.BUSINESS_PHONE_NUMBER_ID2;
  const token = process.env.TOKEN2;

  if (!baseUrl || !version || !businessPhoneNumberId || !token) {
    throw new Error(
      'Missing required environment variables for second number (TOKEN2, BUSINESS_PHONE_NUMBER_ID2). Please check your .env file.'
    );
  }

  return {
    baseUrl,
    version,
    businessPhoneNumberId,
    token,
  };
};

export const config = getConfig();
export const config2 = getConfig2();

import axios, { AxiosInstance, AxiosError } from 'axios';
import { config2 } from '../config/env';
import { MessageRequest, MessageResponse } from '../types/messages';

export class BotPeAPIClient2 {
  private axiosInstance: AxiosInstance;
  private baseUrl: string;
  private version: string;
  private businessPhoneNumberId: string;

  constructor() {
    this.baseUrl = config2.baseUrl;
    this.version = config2.version;
    this.businessPhoneNumberId = config2.businessPhoneNumberId;

    // Create axios instance with default configuration
    this.axiosInstance = axios.create({
      baseURL: `${this.baseUrl}/${this.version}/${this.businessPhoneNumberId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config2.token}`,
      },
      timeout: 30000, // 30 seconds
    });
  }

  /**
   * Send a message via BotPe WhatsApp API (Second Number)
   */
  async sendMessage(messageRequest: MessageRequest): Promise<MessageResponse> {
    try {
      const response = await this.axiosInstance.post<MessageResponse>(
        '/messages',
        messageRequest
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(
          `API Error: ${axiosError.response?.status} - ${
            JSON.stringify(axiosError.response?.data) || axiosError.message
          }`
        );
      }
      throw error;
    }
  }

  /**
   * Get the full API endpoint URL for debugging
   */
  getEndpoint(): string {
    return `${this.baseUrl}/${this.version}/${this.businessPhoneNumberId}/messages`;
  }
}

// Export a singleton instance for second number
export const apiClient2 = new BotPeAPIClient2();

import axios, { AxiosInstance, AxiosError } from 'axios';
import { config } from '../config/env';
import { MessageRequest, MessageResponse } from '../types/messages';

export class BotPeAPIClient {
  private axiosInstance: AxiosInstance;
  private baseUrl: string;
  private version: string;
  private businessPhoneNumberId: string;

  constructor() {
    this.baseUrl = config.baseUrl;
    this.version = config.version;
    this.businessPhoneNumberId = config.businessPhoneNumberId;

    // Create axios instance with default configuration
    this.axiosInstance = axios.create({
      baseURL: `${this.baseUrl}/${this.version}/${this.businessPhoneNumberId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.token}`,
      },
      timeout: 30000, // 30 seconds
    });
  }

  /**
   * Send a message via BotPe WhatsApp API
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

// Export a singleton instance
export const apiClient = new BotPeAPIClient();

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

interface EnvConfig {
  readonly baseUrl: string;
  readonly environment: string;
  getBaseUrl(): string;
}

export const envConfig: EnvConfig = {
  // Base URLs
  baseUrl: process.env.BASE_URL || 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#',
  // Environment selection
  environment: process.env.ENVIRONMENT || 'test',
  
  getBaseUrl() {
    return this.baseUrl;
  }
};

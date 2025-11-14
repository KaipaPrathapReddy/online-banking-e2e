import { faker } from '@faker-js/faker';

/**
 * Test Data Generator Utility
 * Generates unique test data for customer creation using faker
 */

export interface CustomerData {
  firstName: string;
  lastName: string;
  postCode: string;
}

export class DataGenerator {
  /**
   * Generate unique customer data using faker
   */
  static generateCustomerData(): CustomerData {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postCode: faker.location.zipCode()
    };
  }

  /**
   * Generate random deposit amount
   * @param min - Minimum amount (default: 10)
   * @param max - Maximum amount (default: 1000)
   * @returns Amount as string (rounded to 2 decimal places)
   */
  static generateDepositAmount(min: number = 10, max: number = 1000): string {
    const amount = faker.number.int({ min, max });
    return amount.toString();
  }

  /**
   * Generate multiple random deposit amounts
   * @param count - Number of amounts to generate
   * @param min - Minimum amount (default: 10)
   * @param max - Maximum amount (default: 1000)
   * @returns Array of amount strings
   */
  static generateDepositAmounts(count: number, min: number = 10, max: number = 1000): string[] {
    return Array.from({ length: count }, () => this.generateDepositAmount(min, max));
  }
}


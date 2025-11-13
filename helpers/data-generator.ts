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
}


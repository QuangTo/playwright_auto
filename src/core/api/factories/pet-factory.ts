import { faker } from '@faker-js/faker';
import { InputWrapper } from '../types/input-wrapper';
import * as Types from '../types/pet-type';

/**
 * Builder for SchemaCategory
 */
export const categoryBuilder = (overrides: Partial<InputWrapper<Types.SchemaCategory>> = {}): InputWrapper<Types.SchemaCategory> => {
  return {
    id: faker.number.int({ max: 1000000 }),
    name: `category-${faker.string.alphanumeric(5)}`,
    ...overrides
  };
};

/**
 * Builder for SchemaTag
 */
export const tagBuilder = (overrides: Partial<InputWrapper<Types.SchemaTag>> = {}): InputWrapper<Types.SchemaTag> => {
  return {
    id: faker.number.int({ max: 1000000 }),
    name: `tag-${faker.string.alphanumeric(5)}`,
    ...overrides
  };
};

/**
 * Builder for SchemaPet
 */
export const petBuilder = (overrides: Partial<InputWrapper<Types.SchemaPet>> = {}): InputWrapper<Types.SchemaPet> => {
  return {
    id: faker.number.int({ max: 1000000 }),
    category: categoryBuilder(),
    name: `pet-${faker.string.alphanumeric(5)}`,
    photoUrls: [],
    tags: [tagBuilder()],
    status: 'available',
    ...overrides
  };
};

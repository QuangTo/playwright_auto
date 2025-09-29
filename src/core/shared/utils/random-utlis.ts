import { faker } from '@faker-js/faker';

export const generateUniqueNumber = async () => {
  return faker.date.future({ years: 4 });
};

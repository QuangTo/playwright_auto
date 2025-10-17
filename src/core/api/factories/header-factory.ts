import { headerData } from '../data';
const ADMIN_TOKEN = '';
export function getAuthHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${ADMIN_TOKEN}`
  };
}
export const createHeaders = (customHeaders?: Record<string, string>): Record<string, string> => {
  return {
    ...headerData.defaultHeaders,
    ...getAuthHeaders,
    ...customHeaders
  };
};

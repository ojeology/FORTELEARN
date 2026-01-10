import { z } from 'zod';
import { sections } from './schema';

export const api = {
  sections: {
    list: {
      method: 'GET' as const,
      path: '/api/sections',
      responses: {
        200: z.array(z.custom<typeof sections.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

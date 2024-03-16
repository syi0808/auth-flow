import { z } from 'zod';

export const user = {
  validator: z.object({
    id: z.string({ description: 'email' }),
    password: z.string(),
    name: z.string(),
  }),
};

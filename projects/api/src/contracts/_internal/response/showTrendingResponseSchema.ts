import { z } from '../z.ts';
import { showResponseSchema } from './showResponseSchema.ts';

export const showTrendingResponseSchema = z.array(
  z.object({
    watchers: z.number(),
    show: showResponseSchema,
  }),
);
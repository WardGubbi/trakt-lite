import { builder } from '../_internal/builder.ts';
import { extendedQuerySchemaFactory } from '../_internal/request/extendedQuerySchemaFactory.ts';
import { movieResponseSchema } from '../_internal/response/movieResponseSchema.ts';
import type { z } from '../_internal/z.ts';
import { idParamsSchema } from './request/idParamsSchema.ts';
import { ratingsResponseSchema } from './response/ratingsResponseSchema.ts';

export const movies = builder.router({
  summary: {
    path: '/:id',
    method: 'GET',
    query: extendedQuerySchemaFactory<['full', 'cloud9']>(),
    pathParams: idParamsSchema,
    responses: {
      200: movieResponseSchema,
    },
  },
  ratings: {
    path: '/:id/ratings',
    method: 'GET',
    query: extendedQuerySchemaFactory<['all']>(),
    pathParams: idParamsSchema,
    responses: {
      200: ratingsResponseSchema,
    },
  },
}, {
  pathPrefix: '/movies',
});

export type MovieIdParams = z.infer<typeof idParamsSchema>;
export type MovieResponse = z.infer<typeof movieResponseSchema>;
export type MovieRatingsResponse = z.infer<typeof ratingsResponseSchema>;
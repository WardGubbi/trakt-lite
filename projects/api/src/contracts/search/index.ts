import { builder } from '../_internal/builder.ts';
import type { z } from '../_internal/z.ts';
import { searchQuerySchema } from './_internal/request/searchQuerySchema.ts';
import { searchTypeParamFactory } from './_internal/request/searchTypeParamFactory.ts';
import { searchResultResponseSchema } from './_internal/response/searchResultResponseSchema.ts';

/**
 * TODO: add support for 'episode', 'person', 'list'
 */

export const search = builder.router({
  query: {
    path: '/:type',
    method: 'GET',
    pathParams: searchTypeParamFactory<
      ['movie', 'show']
    >(),
    query: searchQuerySchema,
    responses: {
      200: searchResultResponseSchema,
    },
  },
}, {
  pathPrefix: '/search',
});

export type SearchQueryParams = z.infer<typeof searchQuerySchema>;
export type SearchResultResponse = z.infer<typeof searchResultResponseSchema>;
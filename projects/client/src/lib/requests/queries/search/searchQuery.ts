import type { SearchResultResponse } from '$lib/api.ts';
import { authHeader } from '$lib/features/auth/stores/authHeader.ts';
import type { MediaType } from '$lib/models/MediaType.ts';
import { api, type ApiParams } from '../../_internal/api.ts';

export type SearchParams = {
  query: string;
} & ApiParams;

export type SearchResult = {
  type: MediaType;
  id: number;
  title: string;
  year: number;
};

function mapToSearchResultEntry(
  item: SearchResultResponse[0],
): SearchResult {
  const { type } = item;

  const media = (() => {
    switch (type) {
      case 'show':
        return item.show;
      case 'movie':
        return item.movie;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  })();

  return {
    type,
    id: media.ids.trakt,
    title: media.title,
    year: media.year,
  };
}

function searchRequest({
  query,
  fetch,
}: SearchParams): Promise<SearchResult[]> {
  return api({ fetch })
    .search
    .query({
      query: {
        query,
      },
      params: {
        type: 'movie,show',
      },
      extraHeaders: {
        ...authHeader(),
      },
    })
    .then(({ status, body }) => {
      if (status !== 200) {
        throw new Error('Failed to search');
      }

      return body
        .map(mapToSearchResultEntry);
    });
}

export const searchQueryKey = (q: string) => ['search', q] as const;
export const searchQuery = (params: SearchParams) => ({
  queryKey: searchQueryKey(params.query),
  queryFn: () => searchRequest(params),
});
import { type ShowResponse } from '$lib/api.ts';
import { type EpisodeCount } from '$lib/requests/models/EpisodeCount.ts';
import type { ShowSummary } from '$lib/requests/models/ShowSummary.ts';
import { api, type ApiParams } from '../../_internal/api.ts';
import { mapShowResponseToShowSummary } from '../../_internal/mapShowResponseToShowSummary.ts';

type ShowRelatedParams = {
  slug: string;
} & ApiParams;

export type RelatedShow = ShowSummary & EpisodeCount;

export function mapResponseToRelatedShow(
  shows: ShowResponse[],
): RelatedShow[] {
  return shows.map((show) => ({
    episode: {
      count: show.aired_episodes!,
    },
    ...mapShowResponseToShowSummary(show),
  }));
}

function showRelatedRequest(
  { fetch, slug }: ShowRelatedParams,
): Promise<ShowSummary[]> {
  return api({ fetch })
    .shows
    .related({
      query: {
        extended: 'full,cloud9',
      },
      params: {
        id: slug,
      },
    })
    .then(({ status, body }) => {
      if (status !== 200) {
        throw new Error('Failed to fetch related shows');
      }

      return mapResponseToRelatedShow(body);
    });
}

const showRelatedQueryKey = ['showRelated'] as const;
export const showRelatedQuery = (
  params: ShowRelatedParams,
) => ({
  queryKey: showRelatedQueryKey,
  queryFn: () => showRelatedRequest(params),
});
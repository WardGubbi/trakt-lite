import type { Genre, ShowResponse } from '$lib/api.ts';
import { prependHttps } from '$lib/utils/url/prependHttps.ts';
import { api, type ApiParams } from '../../_internal/api.ts';

export type ShowSummary = {
  id: number;
  slug: string;
  runtime: number;
  title: string;
  poster: {
    url: string;
  };
  cover: {
    url: string;
  };
  genres: Genre[];
  overview: string;
};

type ShowSummaryParams = { slug: string } & ApiParams;

export function mapResponseToShowSummary(show: ShowResponse): ShowSummary {
  return {
    id: show.ids.trakt,
    slug: show.ids.slug,
    title: show.title,
    runtime: show.runtime!,
    poster: {
      url: prependHttps(
        show.images?.poster.at(1) ??
          show.images?.poster.at(0),
      )!,
    },
    cover: {
      url: prependHttps(
        show.images?.fanart.at(1) ??
          show.images?.fanart.at(0),
      )!,
    },
    genres: show.genres ?? [],
    overview: show.overview ?? 'TBD',
  };
}

function showSummaryRequest(
  { fetch, slug }: ShowSummaryParams,
): Promise<ShowSummary> {
  return api({ fetch })
    .shows
    .summary({
      params: {
        id: slug,
      },
      query: {
        extended: 'full,cloud9',
      },
    })
    .then(({ status, body }) => {
      if (status !== 200) {
        throw new Error('Failed to fetch up next');
      }

      return mapResponseToShowSummary(body);
    });
}

export const showSummaryQueryKey = (id: string) => ['showSummary', id] as const;
export const showSummaryQuery = (
  params: ShowSummaryParams,
) => ({
  queryKey: showSummaryQueryKey(params.slug),
  queryFn: () => showSummaryRequest(params),
});
import type { MediaStudio } from '$lib/models/MediaStudio.ts';
import { api, type ApiParams } from '../../_internal/api.ts';
import { mapStudioResponseToMediaStudio } from '../../_internal/mapStudioResponseToMediaStudio.ts';

type ShowStudiosQuery = { slug: string } & ApiParams;

export function showStudiosRequest(
  { fetch, slug }: ShowStudiosQuery,
): Promise<MediaStudio[]> {
  return api({ fetch })
    .shows
    .studios({
      params: {
        id: slug,
      },
    })
    .then(({ status, body }) => {
      if (status !== 200) {
        throw new Error('Failed to fetch show studios');
      }

      return body.map(mapStudioResponseToMediaStudio);
    });
}

export const showStudiosQueryKey = (id: string) => ['showStudios', id] as const;
export const showStudiosQuery = (
  params: ShowStudiosQuery,
) => ({
  queryKey: showStudiosQueryKey(params.slug),
  queryFn: () => showStudiosRequest(params),
});

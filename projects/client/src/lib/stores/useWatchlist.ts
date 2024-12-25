import { useUser } from '$lib/features/auth/stores/useUser.ts';
import type { MediaType } from '$lib/models/MediaType.ts';
import { InvalidateAction } from '$lib/requests/models/InvalidateAction.ts';
import { addToWatchlistRequest } from '$lib/requests/sync/addToWatchlistRequest.ts';
import { removeFromWatchlistRequest } from '$lib/requests/sync/removeFromWatchlistRequest.ts';
import { derived, writable } from 'svelte/store';
import { toWatchlistPayload } from './_internal/toWatchlistPayload.ts';
import { useInvalidator } from './useInvalidator.ts';

type WatchlistStoreProps = {
  type: MediaType;
  media: { id: number };
};

export function useWatchlist({ type, media }: WatchlistStoreProps) {
  const isWatchlistUpdating = writable(false);
  const { watchlist } = useUser();
  const { invalidate } = useInvalidator();

  const _isWatchlisted = writable(false);
  const isWatchlisted = derived(
    [watchlist, _isWatchlisted],
    ([$watchlist, $_isWatchlisted]) => {
      if (!$watchlist) {
        return false;
      }

      switch (type) {
        case 'movie':
          return $watchlist.movies.has(media.id) || $_isWatchlisted;
        case 'show':
          return $watchlist.shows.has(media.id) || $_isWatchlisted;
      }
    },
  );

  const addToWatchlist = async () => {
    isWatchlistUpdating.set(true);
    const result = await addToWatchlistRequest({
      body: toWatchlistPayload(type, [media.id]),
    });
    isWatchlistUpdating.set(false);
    _isWatchlisted.set(result);

    await invalidate(InvalidateAction.Watchlisted(type));
  };

  const removeFromWatchlist = async () => {
    isWatchlistUpdating.set(true);
    const result = await removeFromWatchlistRequest({
      body: toWatchlistPayload(type, [media.id]),
    });
    isWatchlistUpdating.set(false);
    _isWatchlisted.set(!result);

    await invalidate(InvalidateAction.Watchlisted(type));
  };

  return {
    isWatchlistUpdating,
    isWatchlisted,
    addToWatchlist,
    removeFromWatchlist,
  };
}

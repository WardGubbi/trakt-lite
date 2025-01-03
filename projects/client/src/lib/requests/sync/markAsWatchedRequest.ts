import { authHeader } from '$lib/features/auth/stores/authHeader.ts';
import type { HistoryRequest } from '@trakt/api';
import { api, type ApiParams } from '../_internal/api.ts';

type MarkAsWatchedParams = {
  body: HistoryRequest;
} & ApiParams;

export function markAsWatchedRequest(
  { body, fetch }: MarkAsWatchedParams,
): Promise<boolean> {
  return api({ fetch })
    .sync
    .history
    .add({
      body,
      extraHeaders: {
        ...authHeader(),
      },
    })
    .then(({ status }) => status === 201);
}

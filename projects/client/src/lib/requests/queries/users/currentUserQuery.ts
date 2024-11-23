import type { SettingsResponse } from '$lib/api.ts';
import { api, type ApiParams } from '../../_internal/api.ts';
import { authHeader } from '../../_internal/authHeader.ts';

export type User = {
  name: {
    full: string;
    first: string;
    last: string;
  };
  location?: string;
  avatar: {
    url: string;
  };
  cover: {
    url: string;
  };
  isVip: boolean;
};

const ALIEN_ISOLATION_COVER =
  'https://walter-r2.trakt.tv/images/movies/000/759/944/fanarts/full/a12a59d031.jpg.webp';

function useDefined(
  ...values: Array<string | Nil>
) {
  return values.find((value) => value?.trim());
}

function mapUserResponse(response: SettingsResponse): User {
  const { user, account } = response;
  const fullName = user.name;
  const [firstName = '', lastName = ''] = user.name.split(' ');

  return {
    name: {
      full: fullName,
      first: firstName,
      last: lastName,
    },
    location: user.location,
    avatar: {
      url: user.images!.avatar.full,
    },
    cover: {
      url: useDefined(
        user.vip_cover_image,
        account.cover_image,
        ALIEN_ISOLATION_COVER,
      )!,
    },
    isVip: user.vip || user.vip_ep,
  };
}

const currentUserRequest = ({ fetch }: ApiParams): Promise<User> =>
  api({ fetch })
    .users
    .settings({
      extraHeaders: {
        ...authHeader(),
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        console.error('Error fetching current user', response);
        /**
         * TODO: define error handling strategy/system
         */
        throw new Error('Error fetching current user.');
      }

      return response.body;
    })
    .then(mapUserResponse);

export const currentUserQuery = ({ fetch }: ApiParams = {}) => ({
  queryKey: ['profile'] as const,
  queryFn: () => currentUserRequest({ fetch }),
});
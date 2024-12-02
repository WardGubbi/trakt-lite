import type { EpisodeType } from './EpisodeType.ts';

export type EpisodeEntry = {
  id: number;
  season: number;
  number: number;
  title: string;
  poster: {
    url: string;
  };
  airedDate: Date;
  type: EpisodeType;
};
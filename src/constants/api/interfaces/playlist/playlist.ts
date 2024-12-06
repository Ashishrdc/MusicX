import { Image } from "../common.interfaces";

export interface Playlist {
  id: string;
  name: string;
  type: string;
  image: Image[];
  url: string;
  songCount: number | null;
  language: string;
  explicitContent: boolean;
}

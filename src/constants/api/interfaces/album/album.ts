import { Image, ArtistGroup } from "../common.interfaces";

export interface Album {
  id: string;
  name: string;
  description: string;
  year: string | null;
  type: string;
  playCount: number | null;
  language: string;
  explicitContent: boolean;
  artists: ArtistGroup;
  url: string;
  image: Image[];
}

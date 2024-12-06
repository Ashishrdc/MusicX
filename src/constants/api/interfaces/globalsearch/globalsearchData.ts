import {
  AlbumResults,
  SongResults,
  ArtistResults,
  PlaylistResults,
  TopQueryResults,
} from "./common";

export interface GlobalSearchData {
  albums: AlbumResults;
  songs: SongResults;
  artists: ArtistResults;
  playlists: PlaylistResults;
  topQuery: TopQueryResults;
}

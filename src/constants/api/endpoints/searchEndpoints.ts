const base = "api/search";

interface SearchEndpointsProp {
  query: string;
}

export const SearchEndpoints = {
  search: ({ query }: SearchEndpointsProp): string => {
    return `${base}?query=${query}`;
  },
  songs: ({ query }: SearchEndpointsProp): string => {
    return `${base}/songs?query=${query}`;
  },
  albums: ({ query }: SearchEndpointsProp): string => {
    return `${base}/albums?query=${query} `;
  },
  artists: ({ query }: SearchEndpointsProp): string => {
    return `${base}/artists?query=${query} `;
  },
  playlists: ({ query }: SearchEndpointsProp): string => {
    return `${base}/songs?query=${query} `;
  },
};

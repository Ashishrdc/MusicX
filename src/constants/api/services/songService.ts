{/* Added by Yugant N (05-2026), Fetch trending songs */}

import axiosInstance from "../../../util/axios/axiosInstance";
import { SearchEndpoints } from "../endpoints/searchEndpoints";
import { SongApiResponse } from "../interfaces/song";

export const fetchSongs = async (query: string) => {
    const response = await axiosInstance.get<SongApiResponse>(
        SearchEndpoints.songs({query})
    );

    return response.data.data.results;
};

export const fetchTrendingSongs = async ()=>{
    const response = await axiosInstance.get<SongApiResponse>(
        SearchEndpoints.songs({query: "top hits"})
    );

    return response.data.data.results;
}




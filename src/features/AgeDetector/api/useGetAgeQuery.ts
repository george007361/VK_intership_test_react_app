import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { AgeResponseData } from "../types/AgeResponseData";

export const useGetAgeQuery = (name: string) => useQuery({
    enabled: false,
    queryKey: ['age', name],
    queryFn: async ({ signal }) => {
        return axios.get<AgeResponseData>('https://api.agify.io/', {
            params: {
                name,
            },
            signal,
        })
    },
    select: ({ data }) => data.age,
}); 
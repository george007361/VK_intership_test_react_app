import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { FactResponseData } from "../types/FactResponseData";

export const useGetFact = () => useQuery({
    enabled: false,
    queryKey: ['fact'],
    queryFn: async ({ signal }) => axios.get<FactResponseData>('https://catfact.ninja/fact', { signal }),
    select: ({ data }) => data.fact,
});
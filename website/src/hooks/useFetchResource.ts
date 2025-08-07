import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utils/axiosInstance';

type FetchResourceParams = {
  resource: string;
  page?: number;
  limit?: number;
  queryString?: string;
  searchFields?: string;
  [key: string]: any;
};

export const useFetchResource = ({
  resource,
  page = 1,
  limit = 10,
  queryString = '',
  searchFields = '',
  ...restParams
}: FetchResourceParams) => {
  const queryKey = [
    resource,
    page,
    limit,
    queryString,
    searchFields,
    ...Object.entries(restParams).map(([key, value]) => `${key}:${value}`),
  ];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await axiosInstance.get(`/${resource}`, {
        params: { page, limit, queryString, searchFields, ...restParams, },
      });

      return response.data;
    },
    staleTime: 5 * 1000,
  });
};

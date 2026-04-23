import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/utils';

type FetchResourceParams = {
  resource: string;
  page?: number;
  limit?: number;
  queryString?: string;
  searchFields?: string;
  isRestoreFetch?: boolean;
  [key: string]: any;
};

export const useFetchResource = ({
  resource,
  page = 1,
  limit = 10,
  queryString = '',
  searchFields = '',
  isRestoreFetch = false,
  ...restParams
}: FetchResourceParams) => {
  const queryKey = [
    resource,
    page,
    limit,
    queryString,
    searchFields,
    isRestoreFetch,
    ...Object.entries(restParams).map(([key, value]) => `${key}:${value}`),
  ];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const endpoint = isRestoreFetch ? `/${resource}/restore` : `/${resource}`;

      const response = await axiosInstance.get(endpoint, {
        params: { page, limit, queryString, searchFields, ...restParams },
      });

      return response.data;
    },
    staleTime: 5 * 1000,
  });
};

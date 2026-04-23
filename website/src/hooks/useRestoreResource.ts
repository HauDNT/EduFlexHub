import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/utils';

export const useRestoreResource = (
  resource: string,
  idsColumnName: string = 'itemIds',
  onSuccessCallback?: () => void,
  onErrorCallback?: (error: any) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemIds: string[]) => {
      console.log(itemIds);


      await axiosInstance.patch(`/${resource}/restore`, {
        [idsColumnName]: itemIds,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resource] });
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      onErrorCallback?.(error);
    },
  });
};

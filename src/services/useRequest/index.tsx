import { useMutation } from '@tanstack/react-query';
import { privateApi } from '..';
import type { IBaseResponse } from '@/types';

type ICreateNewRequestBody = {
  items: { id: string; qty: number }[];
  files: File[];
  remarks?: string;
};

interface ICreateNewRequestResponse extends IBaseResponse {
  data: {
    id: string;
  };
}

export const useCreateNewRequest = () => {
  return useMutation({
    mutationKey: ['request.create-new'],
    mutationFn: async (body: ICreateNewRequestBody) => {
      const formData = new FormData();
      formData.append(
        'items',
        JSON.stringify(
          body.items.map((item) => ({
            product_id: item.id,
            quantity: item.qty,
          }))
        )
      );

      formData.append('remarks', body.remarks ?? '');

      body.files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await privateApi.post<ICreateNewRequestResponse>(
        '/requests',
        formData
      );

      return response;
    },
  });
};

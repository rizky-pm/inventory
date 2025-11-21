import { useMutation, useQuery } from '@tanstack/react-query';
import { privateApi } from '..';
import type { IBaseResponse, IRequest } from '@/types';

interface IGetRequestsRequest {
  page: number;
  size: number;
}

export interface IGetRequestsResponse extends IBaseResponse {
  data: IRequest[];

  meta: {
    page: number;
    size: number;
    total_page: number;
  };
}

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

export const useGetRequests = (params: IGetRequestsRequest) => {
  return useQuery({
    queryKey: ['request.get-requests', params.page, params.size],
    queryFn: async () => {
      const response = await privateApi.get<IGetRequestsResponse>(
        `/requests?page=${params.page}&size=${10}`
      );

      return response.data;
    },
  });
};

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

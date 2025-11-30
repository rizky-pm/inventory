import { useMutation, useQuery } from '@tanstack/react-query';
import { privateApi } from '..';
import type { IBaseResponse, IRequest, ISummary } from '@/types';

export interface IGetSummaryResponse extends IBaseResponse {
  data: ISummary;
}

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

interface IHandleRequestResponse extends IBaseResponse {
  data: {
    id: string;
  };
}

export const useGetSummary = () => {
  return useQuery({
    queryKey: ['request.get-summary'],
    queryFn: async () => {
      const response = await privateApi.get<IGetSummaryResponse>(
        '/requests/summary'
      );

      return response.data;
    },
  });
};

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

export const useRejectRequest = () => {
  return useMutation({
    mutationKey: ['request.reject'],
    mutationFn: async (body: { id: string; remarks?: string }) => {
      const response = await privateApi.patch<IHandleRequestResponse>(
        `/requests/${body.id}/reject`,
        {
          remark: body.remarks,
        }
      );

      return response.data;
    },
  });
};

export const useApproveRequest = () => {
  return useMutation({
    mutationKey: ['request.approve'],
    mutationFn: async (body: {
      id: string;
      pickup_schedule: string;
      remarks?: string;
    }) => {
      const response = await privateApi.patch<IHandleRequestResponse>(
        `/requests/${body.id}/approve`,
        {
          pickup_schedule: body.pickup_schedule,
          remark: body.remarks,
        }
      );

      return response.data;
    },
  });
};

export const useCompleteRequest = () => {
  return useMutation({
    mutationKey: ['request.complete'],
    mutationFn: async (body: {
      id: string;
      files: File[];
      remarks?: string;
    }) => {
      const formData = new FormData();

      formData.append('remarks', body.remarks ?? '');

      body.files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await privateApi.patch<IHandleRequestResponse>(
        `/requests/${body.id}/complete`,
        formData
      );

      return response.data;
    },
  });
};

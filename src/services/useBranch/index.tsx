import { useMutation, useQuery } from '@tanstack/react-query';
import { privateApi } from '..';
import type { IBaseResponse, IBranch } from '@/types';

interface IGetBranchesRequest {
  page: number;
  size: number;
  search?: string;
}

interface IGetBranchesResponse extends IBaseResponse {
  data: IBranch[];
}

interface IAddNewBranchRequest {
  name: string;
  address: string;
}

interface IAddNewBranchResponse extends IBaseResponse {
  data: {
    branch: {
      id: string;
    };
    account: {
      username: string;
      password: string;
    };
  };
}

interface IEditBranchRequest extends IAddNewBranchRequest {
  id: string;
}

interface IEditBranchResponse extends IBaseResponse {
  data: {
    id: string;
  };
}

interface IDeleteBranchRequest {
  id: string;
}

interface IDeleteBranchResponse extends IBaseResponse {
  data: {
    id: string;
  };
}

export const useGetBranches = (params: IGetBranchesRequest) => {
  return useQuery({
    queryKey: ['branch.get-branches', params],
    queryFn: async () => {
      const response = await privateApi.get<IGetBranchesResponse>('/branches', {
        params: {
          page: params.page,
          size: params.size,
          search: params.search || undefined,
        },
      });

      return response.data;
    },
  });
};

export const useAddNewBranch = () => {
  return useMutation({
    mutationKey: ['branch.add-new-branch'],
    mutationFn: async (body: IAddNewBranchRequest) => {
      const response = await privateApi.post<IAddNewBranchResponse>(
        '/branches',
        body
      );

      return response.data;
    },
  });
};

export const useEditBranch = () => {
  return useMutation({
    mutationKey: ['branch.edit-branch'],
    mutationFn: async (body: IEditBranchRequest) => {
      const payload = {
        name: body.name,
        address: body.address,
      };

      const response = await privateApi.put<IEditBranchResponse>(
        `/branches/${body.id}`,
        payload
      );

      return response.data;
    },
  });
};

export const useDeleteBranch = () => {
  return useMutation({
    mutationKey: ['branch.delete-branchh'],
    mutationFn: async (body: IDeleteBranchRequest) => {
      const { id } = body;

      const response = await privateApi.delete<IDeleteBranchResponse>(
        `/branches/${id}`
      );

      return response.data;
    },
  });
};

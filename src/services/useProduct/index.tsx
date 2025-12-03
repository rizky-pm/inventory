import { useMutation, useQuery } from '@tanstack/react-query';
import { privateApi } from '..';
import type { IBaseResponse, IProduct } from '@/types';
import _ from 'lodash';

type TypeGetProductsRequest = {
  page: number;
  size: number;
  search?: string;
};

export type TypeGetProductsResponse = {
  data: IProduct[];

  meta: {
    page: number;
    size: number;
    total_page: number;
  };
};

interface TypeAddNewProductRequest {
  sku: string;
  name: string;
  description?: string;
  stock: string;
}

interface TypeAddNewProductResponse extends IBaseResponse {
  data: {
    id: string;
  };
}

interface TypeEditProductRequest extends TypeAddNewProductRequest {
  id: string;
}

interface IDeleteProductRequest {
  id: string;
}

interface IDeleteProductResponse extends IBaseResponse {
  data: {
    id: string;
  };
}

export const useGetProducts = (params: TypeGetProductsRequest) => {
  return useQuery({
    queryKey: ['product.get-products', params.page, params.size, params.search],
    queryFn: async () => {
      const response = await privateApi.get<TypeGetProductsResponse>(
        `/products`,
        {
          params: {
            page: params.page,
            size: params.size,
            search: params.search || undefined,
          },
        }
      );

      return response.data;
    },
    gcTime: 0,
    staleTime: 0,
  });
};

export const useAddNewProduct = () => {
  return useMutation({
    mutationKey: ['product.add-new-product'],
    mutationFn: async (body: TypeAddNewProductRequest) => {
      const payload = {
        ...body,
        stock: _.toInteger(body.stock),
      };

      const response = await privateApi.post<TypeAddNewProductResponse>(
        '/products',
        payload
      );

      return response;
    },
  });
};

export const useEditProduct = () => {
  return useMutation({
    mutationKey: ['product.edit-product'],
    mutationFn: async (body: TypeEditProductRequest) => {
      const payload = {
        name: body.name,
        sku: body.sku,
        description: body.description,
        stock: _.toInteger(body.stock),
      };

      const response = await privateApi.put<TypeAddNewProductResponse>(
        `/products/${body.id}`,
        payload
      );

      return response.data;
    },
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationKey: ['product.delete-product'],
    mutationFn: async (body: IDeleteProductRequest) => {
      const { id } = body;

      const response = await privateApi.delete<IDeleteProductResponse>(
        `/products/${id}`
      );

      return response.data;
    },
  });
};

import { useMutation, useQuery } from '@tanstack/react-query';
import { privateApi } from '..';
import type { IBaseResponse, IProduct } from 'types';
import _ from 'lodash';

type TypeGetProductsRequest = {
  page: number;
  size: number;
};

type TypeGetProductsResponse = {
  data: IProduct[];
};

type TypeAddNewProductRequest = {
  sku: string;
  name: string;
  description?: string;
  stock: string;
};

interface TypeAddNewProductResponse extends IBaseResponse {
  data: {
    id: string;
  };
}

export const useGetProducts = (params: TypeGetProductsRequest) => {
  return useQuery({
    queryKey: ['product.get-products', params.page, params.size],
    queryFn: async () => {
      const response = await privateApi.get<TypeGetProductsResponse>(
        `/products?page=${params.page}&size=${params.size}`
      );

      return response.data;
    },
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

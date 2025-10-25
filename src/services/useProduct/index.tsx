import { useQuery } from '@tanstack/react-query';
import { privateApi } from '..';
import type { IProduct } from 'types';

type TypeGetProductsResponse = IProduct[];

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['product.get-products'],
    queryFn: async () => {
      const response = await privateApi.get<TypeGetProductsResponse>(
        '/products'
      );

      return response.data;
    },
  });
};

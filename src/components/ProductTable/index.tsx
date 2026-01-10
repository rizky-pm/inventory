import { useRole } from '@/hooks/useRole';
import { UserRole } from '@/types';
import { Package, Plus } from 'lucide-react';
import React, { useEffect, useState, type SetStateAction } from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/stores/useCartStore';
import { DataTable } from './DataTable';
import SearchProduct from './SearchProduct';
import { columns } from './DataTable/columns';
import { useGetProducts } from '@/services/useProduct';
import { useForm } from 'react-hook-form';
import {
  searchProductSchema,
  type SearchProductType,
} from './SearchProduct/search-product.schema';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  setIsDialogOpen?: React.Dispatch<SetStateAction<boolean>>;
}

const ProductTable = (props: Props) => {
  const { setIsDialogOpen } = props;

  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 1,
    pageSize: 10,
  });

  const { hasRole } = useRole();
  const { total } = useCartStore();
  const navigate = useNavigate();

  const form = useForm<SearchProductType>({
    resolver: zodResolver(searchProductSchema),
    defaultValues: {
      productName: '',
    },
  });

  const {
    data: productResponse,
    isLoading,
    isSuccess,
    refetch,
  } = useGetProducts({
    page: pagination.pageIndex,
    size: pagination.pageSize,
    search: form.getValues('productName'),
  });

  useEffect(() => {
    if (pagination.pageIndex > 1) {
      refetch();
    }
  }, [pagination, refetch]);

  return (
    <div className='container mx-auto py-4 space-y-2'>
      <div className='flex justify-between items-end'>
        <SearchProduct form={form} refetch={refetch} />

        {hasRole([UserRole.Supervisor, UserRole.Staff]) && (
          <Button
            aria-label='Add product'
            onClick={() => {
              if (setIsDialogOpen) {
                setIsDialogOpen(true);
              }
            }}
          >
            Add product
            <Plus />
          </Button>
        )}

        {hasRole([UserRole.Branch]) && (
          <Button
            aria-label='Add product'
            onClick={() => {
              if (total() !== 0) {
                navigate('/requests/detail');
              }
            }}
          >
            {total() === 0 ? `${total()} item` : `View ${total()} item(s)`}
            <Package />
          </Button>
        )}
      </div>

      {isSuccess && (
        <DataTable
          key={pagination.pageIndex}
          data={productResponse.data}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
          isLoading={isLoading}
          totalPages={productResponse.meta.total_page}
        />
      )}
    </div>
  );
};

export default ProductTable;

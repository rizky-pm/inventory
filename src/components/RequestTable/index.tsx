import { useRole } from '@/hooks/useRole';
import { UserRole } from '@/types';
import { Package, Plus } from 'lucide-react';
import React, { type SetStateAction } from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/stores/useCartStore';
// import { DataTable } from './DataTable';
// import SearchProduct from './SearchProduct';
// import { columns } from './DataTable/columns';
import { RequestDataTable } from './DataTable';
import { columns } from './DataTable/columns';
import { type IGetRequestsResponse } from '@/services/useRequest';

interface Props {
  setIsDialogOpen?: React.Dispatch<SetStateAction<boolean>>;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: React.Dispatch<
    SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
  requestData: IGetRequestsResponse;
  isLoading: boolean;
  isSuccess: boolean;
}

const RequestTable = (props: Props) => {
  const {
    setIsDialogOpen,
    pagination,
    setPagination,
    requestData,
    isLoading,
    isSuccess,
  } = props;

  const { hasRole } = useRole();
  const { total } = useCartStore();
  const navigate = useNavigate();

  return (
    <div className='container mx-auto py-4 space-y-2'>
      {isSuccess && (
        <RequestDataTable
          key={pagination.pageIndex}
          data={requestData.data}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
          isLoading={isLoading}
          totalPages={requestData.meta.total_page}
        />
      )}
    </div>
  );
};

export default RequestTable;

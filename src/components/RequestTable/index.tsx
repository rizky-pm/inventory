import React, { type SetStateAction } from 'react';
import { RequestDataTable } from './DataTable';
import { columns } from './DataTable/columns';
import { type IGetRequestsResponse } from '@/services/useRequest';

interface Props {
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
  const { pagination, setPagination, requestData, isLoading, isSuccess } =
    props;

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

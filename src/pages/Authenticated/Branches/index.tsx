import SectionWrapper from '@/components/SectionWrapper';
import { Button } from '@/components/ui/button';
import { TypographyH3 } from '@/components/ui/typography';
import { useGetBranches } from '@/services/useBranch';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { DataTable } from './components/DataTable';
import { columns } from './components/DataTable/columns';
import AddBranchDialog from './components/AddBranchDialog';
import SearchBranch from './components/SearchBranch';
import { useForm } from 'react-hook-form';
import {
  searchBranchSchema,
  type SearchBranchType,
} from './components/SearchBranch/schema';
import { zodResolver } from '@hookform/resolvers/zod';

const BranchesPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 1,
    pageSize: 10,
  });

  const form = useForm<SearchBranchType>({
    resolver: zodResolver(searchBranchSchema),
    defaultValues: {
      branchName: '',
    },
  });

  const {
    data: branchResponse,
    isLoading,
    isSuccess,
    refetch,
  } = useGetBranches({
    page: pagination.pageIndex,
    size: pagination.pageSize,
    search: form.getValues('branchName'),
  });

  useEffect(() => {
    if (pagination.pageIndex > 1) {
      refetch();
    }
  }, [pagination, refetch]);

  return (
    <>
      <SectionWrapper>
        <TypographyH3>List of branch</TypographyH3>
        {isLoading ? (
          <p>Loading data...</p>
        ) : (
          <div className='container mx-auto py-4 space-y-2'>
            <div className='flex justify-between items-end'>
              <SearchBranch form={form} refetch={refetch} />
              <Button
                aria-label='Add branch'
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                Add branch
                <Plus />
              </Button>
            </div>

            {isSuccess && (
              <DataTable
                key={pagination.pageIndex}
                data={branchResponse.data}
                columns={columns}
                pagination={pagination}
                setPagination={setPagination}
                isLoading={isLoading}
                totalPages={1}
              />
            )}
          </div>
        )}
      </SectionWrapper>

      <AddBranchDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};

export default BranchesPage;

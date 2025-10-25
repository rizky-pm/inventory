import SectionWrapper from '@/components/SectionWrapper';
import { DataTable } from './components/DataTable';
import { columns } from './components/DataTable/columns';
import SearchProduct from './components/SearchProduct';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddProductDialog from './components/AddProductDialog';
import { useState } from 'react';
import { TypographyH3 } from '@/components/ui/typography';
import type { IUserAuth } from 'types';

import _ from 'lodash';
import { useGetProducts } from '@/services/useProduct';

const HomePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 1,
    pageSize: 10,
  });

  const user: IUserAuth = JSON.parse(localStorage.getItem('user') || 'null');

  const { data: productResonse, isLoading } = useGetProducts({
    page: pagination.pageIndex,
    size: pagination.pageSize,
  });

  return (
    <>
      <SectionWrapper>
        <TypographyH3>Hello, {_.startCase(user.full_name)}</TypographyH3>

        {isLoading ? (
          <p>Loading data...</p>
        ) : (
          <div className='container mx-auto py-4 space-y-2'>
            <div className='flex justify-between items-end'>
              <SearchProduct />

              <Button
                aria-label='Add product'
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                Add product
                <Plus />
              </Button>
            </div>

            {productResonse?.data ? (
              <DataTable
                data={productResonse.data}
                columns={columns}
                pagination={pagination}
                setPagination={setPagination}
              />
            ) : null}
          </div>
        )}
      </SectionWrapper>

      <AddProductDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};

export default HomePage;

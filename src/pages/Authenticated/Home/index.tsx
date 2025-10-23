import SectionWrapper from '@/components/SectionWrapper';
import { DataTable } from './components/DataTable';
import { columns } from './components/DataTable/columns';
import { Product } from '@/data/Product';
import SearchProduct from './components/SearchProduct';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddProductDialog from './components/AddProductDialog';
import { useState } from 'react';
import { TypographyH3 } from '@/components/ui/typography';

const HomePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <SectionWrapper>
        <TypographyH3>Hello, Username!</TypographyH3>

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

          <DataTable data={Product} columns={columns} />
        </div>
      </SectionWrapper>

      <AddProductDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};

export default HomePage;

import SectionWrapper from '@/components/SectionWrapper';
import { useState } from 'react';
import { TypographyH3 } from '@/components/ui/typography';

import ProductTable from '@/components/ProductTable';
import AddProductDialog from '@/components/ProductTable/AddProductDialog';

const ProductsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <SectionWrapper>
        <TypographyH3>List of product</TypographyH3>

        <ProductTable setIsDialogOpen={setIsDialogOpen} />
      </SectionWrapper>

      <AddProductDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};

export default ProductsPage;

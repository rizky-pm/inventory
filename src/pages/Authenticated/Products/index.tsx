import SectionWrapper from '@/components/SectionWrapper';
import { useState } from 'react';
import { TypographyH3 } from '@/components/ui/typography';
import { type IUserAuth } from '@/types';

import _ from 'lodash';
import ProductTable from '@/components/ProductTable';
import AddProductDialog from '@/components/ProductTable/AddProductDialog';

const ProductsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const user: IUserAuth = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <>
      <SectionWrapper>
        <TypographyH3>Hello, {_.startCase(user.full_name)}</TypographyH3>

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

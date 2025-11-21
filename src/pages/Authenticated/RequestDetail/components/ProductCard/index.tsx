import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { TypographyMuted } from '@/components/ui/typography';
import { useCartStore, type IProductInCart } from '@/stores/useCartStore';
import _ from 'lodash';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface Props {
  product: IProductInCart;
}

interface IOnChangeQty {
  type: 'increment' | 'decrement' | 'direct';
  id: string;
  qty?: number;
}

const ProductCard = (props: Props) => {
  const { product } = props;

  const { updateQty, increaseQty, decreaseQty } = useCartStore();

  const onChangeQty = ({ type, id, qty }: IOnChangeQty) => {
    if (type === 'increment') {
      increaseQty(id);
    } else if (type === 'decrement') {
      decreaseQty(id);
    } else if (type === 'direct') {
      if (qty) {
        updateQty(id, qty);
      }
    }
  };

  return (
    <>
      <div className='product-card py-4'>
        <div className='pc-name'>
          <p className='font-semibold'>{product.name}</p>
        </div>
        <div className='pc-sku'>
          <TypographyMuted>{product.sku}</TypographyMuted>
        </div>
        <div className='pc-qty flex items-center'>
          <ButtonGroup aria-label='Media controls' className='h-fit'>
            <Input
              value={product.qty}
              className='w-20 text-center'
              onChange={(e) => {
                const qty = e.target.value;
                const params: IOnChangeQty = {
                  type: 'direct',
                  id: product.id,
                  qty: _.toInteger(qty),
                };
                onChangeQty(params);
              }}
            />

            <Button
              variant='outline'
              size='icon'
              onClick={() => {
                const params: IOnChangeQty = {
                  type: 'decrement',
                  id: product.id,
                };

                onChangeQty(params);
              }}
            >
              <MinusIcon />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => {
                const params: IOnChangeQty = {
                  type: 'increment',
                  id: product.id,
                };

                onChangeQty(params);
              }}
            >
              <PlusIcon />
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <Separator />
    </>
  );
};

export default ProductCard;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { IRequest } from '@/types';

type Items = Pick<IRequest, 'items'>;

const RequestedItemsTable = (props: Items) => {
  const { items } = props;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className=''>No.</TableHead>
          <TableHead>Item</TableHead>
          <TableHead className='text-right'>Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell className='font-medium'>{index + 1}</TableCell>
            <TableCell>{item.product_name}</TableCell>
            <TableCell className='text-right'>{item.quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RequestedItemsTable;

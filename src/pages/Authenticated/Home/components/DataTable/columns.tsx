import { type ColumnDef } from '@tanstack/react-table';
import type { IProduct } from 'types';
import ProductActionsCell from './ProductActionsCell';

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <ProductActionsCell product={row.original} />,
  },
];

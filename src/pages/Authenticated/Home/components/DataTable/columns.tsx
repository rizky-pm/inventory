import { type ColumnDef } from '@tanstack/react-table';
import { Product } from '@/data/Product';

export type Product = {
  id: number;
  sku: string;
  name: string;
  stock: number;
};

export const columns: ColumnDef<Product>[] = [
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
];

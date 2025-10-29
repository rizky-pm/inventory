import { type ColumnDef } from '@tanstack/react-table';
import type { IBranch } from '@/types';
import BranchActionsCell from './BranchActionsCell';

export const columns: ColumnDef<IBranch>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <BranchActionsCell branch={row.original} />,
  },
];

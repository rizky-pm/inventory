import type { ColumnDef } from '@tanstack/react-table';
import RequestActionsCell from './RequestActionsCell';
import type { IRequest } from '@/types';
import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<IRequest>[] = [
  {
    id: 'no',
    header: 'No',
    size: 1,
    cell: ({ row }) => <p>{row.index + 1}.</p>,
  },
  {
    accessorKey: 'code',
    header: 'Request Code',
    size: 1,
    cell: ({ row }) => <p>{row.original.code}</p>,
  },

  {
    accessorKey: 'current_status',
    header: 'Status',
    size: 1,
    cell: ({ row }) => {
      const value = row.original.current_status;

      if (value === 'pending') {
        return (
          <Badge variant={value} className='capitalize'>
            {value}
          </Badge>
        );
      } else if (value === 'approved') {
        return (
          <Badge variant={value} className='capitalize'>
            {value}
          </Badge>
        );
      } else if (value === 'rejected') {
        return (
          <Badge variant={value} className='capitalize'>
            {value}
          </Badge>
        );
      } else if (value === 'completed') {
        return (
          <Badge variant={value} className='capitalize'>
            {value}
          </Badge>
        );
      }

      return <Badge>{row.original.current_status}</Badge>;
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ row }) => {
      const readableCreatedAt = dayjs(row.original.created_at).format(
        'DD MMMM YYYY HH:mm'
      );

      return <p>{readableCreatedAt}</p>;
    },
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated At',
    cell: ({ row }) => {
      const readableUpdatedAt = dayjs(row.original.updated_at).format(
        'DD MMMM YYYY HH:mm'
      );

      return <p>{readableUpdatedAt}</p>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => (
      <div>
        <RequestActionsCell request={row.original} />
      </div>
    ),
  },
];

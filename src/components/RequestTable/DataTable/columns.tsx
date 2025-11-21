import type { ColumnDef } from '@tanstack/react-table';
import RequestActionsCell from './RequestActionsCell';
import type { IRequest } from '@/types';
import _ from 'lodash';
import dayjs from 'dayjs';

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
    cell: ({ row }) => <p>{_.capitalize(row.original.current_status)}</p>,
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

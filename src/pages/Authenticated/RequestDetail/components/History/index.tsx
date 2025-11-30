import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge';
import type { TStatusHistory } from '../SupervisorRequestUI';
import { Button } from '@/components/ui/button';
import { File } from 'lucide-react';
import { TypographyH4, TypographyMuted } from '@/components/ui/typography';

interface HistoryProps {
  history: TStatusHistory;
}

const History = ({ history }: HistoryProps) => {
  if (history.length === 0) {
    return;
  }

  return (
    <div className='space-y-2 border p-4 rounded-lg shadow'>
      <TypographyH4>History</TypographyH4>

      {history.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            'flex justify-between p-4 rounded items-center',
            index % 2 === 0 ? 'bg-secondary' : ''
          )}
        >
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>
              {dayjs(item.created_at).format('D MMMM YYYY HH:mm')}
            </span>
            <TypographyMuted>{item.remark}</TypographyMuted>
          </div>

          <div className='flex flex-col items-end gap-2'>
            <Badge className='capitalize' variant={item.status}>
              {item.status}
            </Badge>
            {item.attachments.length ? (
              <Button
                variant={'outline'}
                size={'icon'}
                onClick={() => {
                  window.open(item.attachments[0].url_file);
                }}
              >
                <File />
              </Button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;

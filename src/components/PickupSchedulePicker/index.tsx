import React, { type SetStateAction } from 'react';

import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import dayjs from 'dayjs';
import { getDateTime } from '@/utils';

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  date: Date | undefined;
  setDate: React.Dispatch<SetStateAction<Date | undefined>>;
  time: string | undefined;
  setTime: React.Dispatch<SetStateAction<string | undefined>>;
}

const PickupSchedulePicker = (props: IProps) => {
  const { open, setOpen, date, setDate, time, setTime } = props;

  const { yesterday, firstFiveDaysEnd, monthStart } = getDateTime();

  const disabledDays = [
    { from: monthStart.toDate(), to: firstFiveDaysEnd.toDate() },
    {
      from: monthStart.toDate(),
      to: yesterday.toDate(),
    },
    { dayOfWeek: [0, 6] },
  ];

  return (
    <div className='flex gap-6'>
      <div className='flex flex-col gap-3 w-3/4'>
        <Label htmlFor='date-picker' className='px-1'>
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              id='date-picker'
              className='justify-between font-normal'
            >
              {date ? dayjs(date).format('dddd, DD MMMM YYYY') : 'Select date'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
            <Calendar
              disabled={disabledDays}
              mode='single'
              selected={date}
              captionLayout='dropdown'
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex flex-col gap-3 w-1/4'>
        <Label htmlFor='time-picker' className='px-1'>
          Time
        </Label>
        <Input
          type='time'
          id='time-picker'
          step='1'
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
          min='09:00'
          max='17:00'
          className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
        />
      </div>
    </div>
  );
};

export default PickupSchedulePicker;

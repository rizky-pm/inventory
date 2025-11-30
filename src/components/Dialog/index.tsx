import React, { type SetStateAction } from 'react';

import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { TypeCompleteRequestSchema } from '@/pages/Authenticated/RequestDetail/components/SupervisorRequestUI/schema';

interface IConfirmationDialogProps {
  title: string;
  description?: string;
  onPositive: (values?: TypeCompleteRequestSchema) => void; // unified
  onNegative?: () => void;
  positiveLabel?: string;
  negativeLabel?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
  isLoading?: boolean;
  footer?: boolean;
}

export const ConfirmationDialog = (props: IConfirmationDialogProps) => {
  const {
    title,
    description,
    onPositive,
    onNegative,
    positiveLabel = 'Confirm',
    negativeLabel = 'Cancel',
    isOpen,
    setIsOpen,
    children,
    isLoading = false,
    footer = true,
  } = props;
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children && children}

        {footer ? (
          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={isLoading}
                variant='outline'
                onClick={() => {
                  if (onNegative) {
                    onNegative();
                  }
                  setIsOpen(false);
                }}
              >
                {negativeLabel}
              </Button>
            </DialogClose>
            <Button
              disabled={isLoading}
              type='submit'
              onClick={() => {
                onPositive();
                setIsOpen(false);
              }}
            >
              {positiveLabel}
            </Button>
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

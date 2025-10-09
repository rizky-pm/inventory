import { cn } from '@/lib/utils';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export function TypographyH1({ children, className }: IProps) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH3({ children }: IProps) {
  return (
    <h3 className='scroll-m-20 text-2xl font-bold tracking-tight'>
      {children}
    </h3>
  );
}

export function TypographyMuted({ children, className }: IProps) {
  return (
    <p className={cn('text-muted-foreground text-sm', className)}>{children}</p>
  );
}

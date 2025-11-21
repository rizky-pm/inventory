import { cn } from '@/lib/utils';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper = (props: IProps) => {
  const { children, className } = props;

  return (
    <section className={cn('w-11/12 bg-background py-4 px-4', className)}>
      {children}
    </section>
  );
};

export default SectionWrapper;

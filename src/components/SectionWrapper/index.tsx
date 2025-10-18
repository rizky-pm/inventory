interface IProps {
  children: React.ReactNode;
}

const SectionWrapper = (props: IProps) => {
  const { children } = props;

  return (
    <section className='w-11/12 bg-background py-4 px-4'>{children}</section>
  );
};

export default SectionWrapper;

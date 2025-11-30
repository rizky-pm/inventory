interface IProps {
  requestCode: string;
}

const RequestDetailViewOnly = ({ requestCode }: IProps) => {
  return (
    <div>
      <h1>{requestCode}</h1>
    </div>
  );
};

export default RequestDetailViewOnly;

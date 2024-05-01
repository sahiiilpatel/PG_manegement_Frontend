import AddBed from '../addUser-form/AddUser';

type TStudentsTableProps = {
  bedList: any;
  isLoading: boolean;
};

export default function BedTable({ bedList, isLoading }: TStudentsTableProps) {
  return (
    <>
      {/* <StudentTableActions /> */}
      <AddBed bedList={bedList} isLoading={isLoading} />
    </>
  );
}

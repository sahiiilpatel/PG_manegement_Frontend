import AddUser from '../addUser-form/AddUser';

type TStudentsTableProps = {
  pgList: any;
};

export default function PgTable({ pgList }: TStudentsTableProps) {
  console.log(pgList, 'pgList11111');
  return (
    <>
      {/* <StudentTableActions /> */}
      <AddUser pgList={pgList} />
    </>
  );
}

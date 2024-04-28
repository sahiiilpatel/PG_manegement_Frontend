import AddPg from '../addPg-form/AddPg';

type TStudentsTableProps = {
  pgList: any;
};

export default function PgTable({ pgList }: TStudentsTableProps) {
  console.log(pgList, 'pgList11111');
  return (
    <>
      {/* <StudentTableActions /> */}
      <AddPg pgList={pgList} />
    </>
  );
}

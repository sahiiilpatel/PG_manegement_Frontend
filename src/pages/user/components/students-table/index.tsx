import AddUser from '../addUser-form/AddUser';

type TStudentsTableProps = {
  userList: any;
  isLoading: boolean;
};

export default function PgTable({ userList }: TStudentsTableProps) {
  return (
    <>
      {/* <StudentTableActions /> */}
      <AddUser userList={userList} />
    </>
  );
}

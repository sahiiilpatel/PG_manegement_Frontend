import AddUser from '../addUser-form/AddUser';

type TStudentsTableProps = {
  userList: any;
  isLoading: boolean;
};

export default function PgTable({ userList, isLoading }: TStudentsTableProps) {
  return (
    <>
      {/* <StudentTableActions /> */}
      <AddUser userList={userList} isLoading={isLoading} />
    </>
  );
}

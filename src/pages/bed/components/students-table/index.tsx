import AddBed from '../addUser-form/AddBed';

type TStudentsTableProps = {
  bedList: any;
  isLoading: boolean;
  userListUnAssign: any;
};

export default function BedTable({
  bedList,
  isLoading,
  userListUnAssign
}: TStudentsTableProps) {
  return (
    <>
      {/* <StudentTableActions /> */}
      <AddBed
        bedList={bedList}
        isLoading={isLoading}
        userListUnAssign={userListUnAssign}
      />
    </>
  );
}

import { useState } from 'react';
import StudentTableActions from './student-table-action';
import AddRoom from '../addRoom-form/AddRoom';
import { useGetRoomList } from '../../queries/queries';

type TStudentsTableProps = {
  pgList: any;
};

export default function StudentsTable({ pgList }: TStudentsTableProps) {
  const { data, isLoading } = useGetRoomList();
  // const [selectedValue,setSelectedValue] = useState<React.Dispatch<React.SetStateAction<undefined>>>()
  // console.log(selectedValue,"selectedValue")
  return (
    <>
      {/* <StudentTableActions selectedValue={selectedValue} setSelectedValue={setSelectedValue} pgList={pgList}/> */}
      {/* {selectedValue && ( */}
      <AddRoom pgList={pgList} roomList={data} />
      {/* )} */}
    </>
  );
}

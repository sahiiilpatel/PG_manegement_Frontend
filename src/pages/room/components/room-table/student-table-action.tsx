// import PopupModal from '@/components/shared/popup-modal';
// import TableSearchInput from '@/components/shared/table-search-input';
// import StudentCreateForm from '../student-forms/student-create-form';
// import AddRoom from '../addRoom-form/AddRoom';
import { SelectType } from '../../SelectType';

interface PgList {
  pgList: any;
  selectedValue?: any;
  setSelectedValue?: any;
}

export default function StudentTableActions({
  pgList,
  selectedValue,
  setSelectedValue
}: PgList) {
  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex-1 gap-4">
        <SelectType
          placeholder="Select Pg"
          data={pgList}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </div>
      {/* <div className="flex gap-3">
        <PopupModal
          renderModal={(onClose) => <AddRoom modalClose={onClose} />}
        />
      </div> */}
    </div>
  );
}

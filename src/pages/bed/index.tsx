import PageHead from '@/components/shared/page-head';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { useGetBedList } from '../room/queries/queries';
import { useSelector } from 'react-redux';
import { BlurPage } from '@/components/blur/BlurPage';
import { Navigate } from 'react-router-dom';
import { roleEnums } from '@/utils/enums/roleEnums';
import BedTable from './components/students-table';

export default function BedPage() {
  // const { data, isLoading } = useGetPgList();
  const { data, isLoading } = useGetBedList();

  const user = useSelector((state: any) => state?.user?.userInfo);

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton
          columnCount={10}
          filterableColumnCount={2}
          searchableColumnCount={1}
        />
      </div>
    );
  }

  return (
    <div className="p-5">
      {user?.role === roleEnums.pgOwner ? (
        user?.subscription?.isActive ? (
          <>
            <PageHead title="Student Management | App" />
            <BedTable bedList={data} isLoading={isLoading} />
          </>
        ) : (
          <BlurPage />
        )
      ) : (
        <Navigate to="/404" />
      )}
    </div>
  );
}

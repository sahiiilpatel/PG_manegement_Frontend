import PageHead from '@/components/shared/page-head';
import { useGetPgList } from './queries/queries';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import StudentsTable from './components/room-table';
import { BlurPage } from '@/components/blur/BlurPage';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { roleEnums } from '@/utils/enums/roleEnums';

export default function RoomPage() {
  const { data, isLoading } = useGetPgList();
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
            <StudentsTable pgList={data} />
          </>
        ) : (
          <BlurPage />
        )
      ) : (
        <Navigate to="/404" />
      )}
      {/* <PageHead title="Student Management | App" />
      <StudentsTable pgList={data} /> */}
    </div>
  );
}

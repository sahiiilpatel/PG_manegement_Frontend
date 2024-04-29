import PageHead from '@/components/shared/page-head';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import PgTable from './components/students-table';
import { useGetPgList } from '../room/queries/queries';
import { BlurPage } from '@/components/blur/BlurPage';
import { useSelector } from 'react-redux';
import { roleEnums } from '@/utils/enums/roleEnums';
import { Navigate } from 'react-router-dom';

export default function PgPage() {
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
            <PgTable pgList={data} />
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

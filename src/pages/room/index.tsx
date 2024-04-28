import PageHead from '@/components/shared/page-head';
import { useGetPgList } from './queries/queries';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import StudentsTable from './components/room-table';

export default function RoomPage() {
  const { data, isLoading } = useGetPgList();
  console.log(data, 'data11111111');

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
      <PageHead title="Student Management | App" />
      <StudentsTable pgList={data} />
    </div>
  );
}

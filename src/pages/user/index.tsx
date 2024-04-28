import PageHead from '@/components/shared/page-head';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import PgTable from './components/students-table';
import { useGetPgList } from '../room/queries/queries';

export default function UserPage() {
  const { data, isLoading } = useGetPgList();

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
      <PgTable pgList={data} />
    </div>
  );
}

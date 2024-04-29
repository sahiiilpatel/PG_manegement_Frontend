import { getPgList } from '@/api/pg/pgApi';
import {
  getRoomList,
  getRoomListByPgId,
  getRoomListByRoomId
} from '@/api/room/roomApi';
import { roleEnums } from '@/utils/enums/roleEnums';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

export const useGetPgList = () => {
  const user = useSelector((state: any) => state?.user?.userInfo);
  if (user?.role === roleEnums.pgOwner && user?.subscription?.isActive) {
    return useQuery({
      queryKey: ['pgList'],
      queryFn: async () => getPgList()
    });
  } else {
    return {
      data: [],
      isloading: false
    };
  }
};

export const useGetRoomListByPgId = (pgId: string) => {
  const user = useSelector((state: any) => state?.user?.userInfo);
  if (user?.role === roleEnums.pgOwner && user?.subscription?.isActive) {
    return useQuery({
      queryKey: ['pgListByPgId', pgId],
      queryFn: async () => getRoomListByPgId(pgId)
    });
  } else {
    return {
      data: [],
      isloading: false
    };
  }
};

export const useGetRoomList = () => {
  const user = useSelector((state: any) => state?.user?.userInfo);
  if (user?.role === roleEnums.pgOwner && user?.subscription?.isActive) {
    return useQuery({
      queryKey: ['roomList'],
      queryFn: async () => getRoomList()
    });
  } else {
    return {
      data: [],
      isloading: false
    };
  }
};

export const useRoomListQuery = (
  activeTab: string,
  selectedId: string | undefined
) => {
  const user = useSelector((state: any) => state?.user?.userInfo);
  if (
    user?.role ===
    ((roleEnums.pgOwner && user?.subscription?.isActive) ||
      roleEnums.superAdmin)
  ) {
    return useQuery({
      queryKey: ['pgListByPgId', selectedId], // Unique query key
      queryFn: async () => {
        if (activeTab === '2' || selectedId) {
          const data = await getRoomListByPgId(selectedId);
          return data;
        }
      },
      enabled: !!(activeTab === '2' && selectedId) // Only fetch data when conditions are met
      // Optional configuration options (refer to TanStack React Query docs for details)
      // staleTime: 1000 * 60, // Cache data for 1 minute (example)
      // retry: 3, // Retry failed queries up to 3 times (example)
    });
  } else {
    return {
      data: [],
      isloading: false
    };
  }
};

export const useRoomDataQuery = (
  activeTab: string,
  selectedId: string | undefined
) => {
  return useQuery({
    queryKey: ['pgListByPgId', selectedId], // Unique query key
    queryFn: async () => {
      if (activeTab === '3' || selectedId) {
        const data = await getRoomListByRoomId(selectedId);
        return data;
      }
    },
    enabled: !!(activeTab === '3' && selectedId) // Only fetch data when conditions are met
    // Optional configuration options (refer to TanStack React Query docs for details)
    // staleTime: 1000 * 60, // Cache data for 1 minute (example)
    // retry: 3, // Retry failed queries up to 3 times (example)
  });
};

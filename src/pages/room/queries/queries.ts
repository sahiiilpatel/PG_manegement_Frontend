import { getBedList } from '@/api/bed/bedApi';
import { dashBoardApi } from '@/api/dashboard/dashboard';
import { getPgList } from '@/api/pg/pgApi';
import {
  getRoomList,
  getRoomListByPgId,
  getRoomListByRoomId
} from '@/api/room/roomApi';
import { getSubscriptionPlanList } from '@/api/subscription/subscription';
import { listUser, listUserUnAssign } from '@/api/user/userApi';
import { roleEnums } from '@/utils/enums/roleEnums';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
interface PgListResponse {
  data: any[];
  isLoading: boolean;
}

interface UserListResponse {
  data: any[];
  isLoading: boolean;
}

interface UserListUnAssignResponse {
  data: any[];
  isLoading: boolean;
}
interface BedListResponse {
  data: any[];
  isLoading: boolean;
}

interface RoomListByPgIdResponse {
  data: any[];
  isLoading: boolean;
}

interface RoomListResponse {
  data: any[];
  isLoading: boolean;
}

interface DashboardListResponse {
  data: any[];
  isLoading: boolean;
}

interface RoomListQueryResponse {
  data: any[];
  isLoading: boolean;
}
interface SubscriptionListResponse {
  data: any[];
  isLoading: boolean;
}

// temporary for build @@@@@@@@@@@@@@@
interface useGetStudentsResponse {
  data: { users: User[]; total_users: number };
  isLoading: boolean;
}
interface User {
  id: number;
  name: string;
}

export const useGetPgList = (): PgListResponse => {
  const user = useSelector((state: any) => state?.user?.userInfo);

  if (user?.role === roleEnums.pgOwner && user?.subscription?.isActive) {
    const queryResult: UseQueryResult<any[], Error> = useQuery({
      queryKey: ['pgList'],
      queryFn: async () => getPgList()
    });

    return {
      data: queryResult.data || [],
      isLoading: queryResult.isLoading
    };
  } else {
    return {
      data: [],
      isLoading: false
    };
  }
};

export const useGetUserList = (): UserListResponse => {
  const user = useSelector((state: any) => state?.user?.userInfo);

  if (user?.role === roleEnums.pgOwner && user?.subscription?.isActive) {
    const queryResult: UseQueryResult<any[], Error> = useQuery({
      queryKey: ['userList'],
      queryFn: async () => listUser()
    });

    return {
      data: queryResult.data || [],
      isLoading: queryResult.isLoading
    };
  } else {
    return {
      data: [],
      isLoading: false
    };
  }
};

export const useUserListUnAssign = (): UserListUnAssignResponse => {
  const user = useSelector((state: any) => state?.user?.userInfo);

  if (user?.role === roleEnums.pgOwner && user?.subscription?.isActive) {
    const queryResult: UseQueryResult<any[], Error> = useQuery({
      queryKey: ['userList'],
      queryFn: async () => listUserUnAssign()
    });

    return {
      data: queryResult.data || [],
      isLoading: queryResult.isLoading
    };
  } else {
    return {
      data: [],
      isLoading: false
    };
  }
};

export const useGetBedList = (): BedListResponse => {
  const user = useSelector((state: any) => state?.user?.userInfo);

  if (user?.role === roleEnums.pgOwner && user?.subscription?.isActive) {
    const queryResult: UseQueryResult<any[], Error> = useQuery({
      queryKey: ['bedList'],
      queryFn: async () => getBedList()
    });

    return {
      data: queryResult.data || [],
      isLoading: queryResult.isLoading
    };
  } else {
    return {
      data: [],
      isLoading: false
    };
  }
};

export const useGetSubscriptionList = (): SubscriptionListResponse => {
  const user = useSelector((state: any) => state?.user?.userInfo);

  if (user?.role === roleEnums.pgOwner && !user?.subscription?.isActive) {
    const queryResult: UseQueryResult<any[], Error> = useQuery({
      queryKey: ['subscriptionList'],
      queryFn: async () => getSubscriptionPlanList()
    });

    return {
      data: queryResult.data || [],
      isLoading: queryResult.isLoading
    };
  } else {
    return {
      data: [],
      isLoading: false
    };
  }
};

export const useGetRoomListByPgId = (pgId: string): RoomListByPgIdResponse => {
  const user = useSelector((state: any) => state?.user?.userInfo);

  if (user?.role === roleEnums.pgOwner && user?.subscription?.isActive) {
    const queryResult: UseQueryResult<any[], Error> = useQuery({
      queryKey: ['pgListByPgId', pgId],
      queryFn: async () => getRoomListByPgId(pgId)
    });

    return {
      data: queryResult.data || [],
      isLoading: queryResult.isLoading
    };
  } else {
    return {
      data: [],
      isLoading: false
    };
  }
};

export const useGetRoomList = (): RoomListResponse => {
  const user = useSelector((state: any) => state?.user?.userInfo);

  if (user?.role === roleEnums.pgOwner && user?.subscription?.isActive) {
    const queryResult: UseQueryResult<any[], Error> = useQuery({
      queryKey: ['roomList'],
      queryFn: async () => getRoomList()
    });

    return {
      data: queryResult.data || [],
      isLoading: queryResult.isLoading
    };
  } else {
    return {
      data: [],
      isLoading: false
    };
  }
};

export const useGetDashboardList = (): DashboardListResponse => {
  const user = useSelector((state: any) => state?.user?.userInfo);

  if (user?.role === roleEnums.pgOwner && user?.subscription?.isActive) {
    const queryResult: UseQueryResult<any[], Error> = useQuery({
      queryKey: ['dashboardList'],
      queryFn: async () => dashBoardApi()
    });

    return {
      data: queryResult.data || [],
      isLoading: queryResult.isLoading
    };
  } else {
    return {
      data: [],
      isLoading: false
    };
  }
};

export const useRoomListQuery = (
  activeTab: string,
  selectedId: any
): RoomListQueryResponse => {
  const user = useSelector((state: any) => state?.user?.userInfo);

  if (
    user?.role ===
    ((roleEnums.pgOwner && user?.subscription?.isActive) ||
      roleEnums.superAdmin)
  ) {
    const queryResult: UseQueryResult<any[], Error> = useQuery({
      queryKey: ['pgListByPgId', selectedId],
      queryFn: async () => {
        if (activeTab === '2' || selectedId) {
          const data = await getRoomListByPgId(selectedId);
          return data;
        }
      },
      enabled: !!(activeTab === '2' && selectedId)
    });

    return {
      data: queryResult.data || [],
      isLoading: queryResult.isLoading
    };
  } else {
    return {
      data: [],
      isLoading: false
    };
  }
};

export const useRoomDataQuery = (activeTab: string, selectedId: any) => {
  return useQuery({
    queryKey: ['pgListByPgId', selectedId],
    queryFn: async () => {
      if (activeTab === '3' || selectedId) {
        const data = await getRoomListByRoomId(selectedId);
        return data;
      }
    },
    enabled: !!(activeTab === '3' && selectedId)
  });
};

// temporary for build @@@@@@@@@@@@@@@
export const useGetStudents = (
  id1: any,
  id2: any,
  id3: any
): useGetStudentsResponse => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
  ];
  const total_users = users.length;

  return {
    data: { users, total_users },
    isLoading: false
  };
};

import { getPgList } from '@/api/pg/pgApi';
import {
  getRoomList,
  getRoomListByPgId,
  getRoomListByRoomId
} from '@/api/room/roomApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useGetPgList = () => {
  return useQuery({
    queryKey: ['pgList'],
    queryFn: async () => getPgList()
  });
};

export const useGetRoomListByPgId = (pgId) => {
  return useQuery({
    queryKey: ['pgListByPgId', pgId],
    queryFn: async () => getRoomListByPgId(pgId)
  });
};

export const useGetRoomList = () => {
  return useQuery({
    queryKey: ['roomList'],
    queryFn: async () => getRoomList()
  });
};

export const useRoomListQuery = (
  activeTab: string,
  selectedId: string | undefined
) => {
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

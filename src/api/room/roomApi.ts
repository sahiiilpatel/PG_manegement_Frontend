import { apiService } from '@/helpers/serviceMaker';

export const addRoom = async (pgId: string, data: any) =>
  apiService(`/add-room/${pgId}`, 'POST', data);

export const getRoomListByPgId = async (pgId: string) =>
  apiService(`/room-list/${pgId}`, 'GET');

export const getRoomListByRoomId = async (roomId: string) =>
  apiService(`/room-data/${roomId}`, 'GET');

export const getRoomList = async () => apiService('/room-list', 'GET');

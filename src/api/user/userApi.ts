import { apiService } from '@/helpers/serviceMaker';

export const addUser = async (data: any) =>
  apiService(`/occupant/register`, 'POST', data);

export const listUser = async () => apiService(`/user/user-list`, 'GET');

export const listUserUnAssign = async () =>
  apiService(`/occupant/unassign-data`, 'GET');

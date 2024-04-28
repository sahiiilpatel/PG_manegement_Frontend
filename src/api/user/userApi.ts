import { apiService } from '@/helpers/serviceMaker';

export const addUser = async (data: any) =>
  apiService(`/occupant/register`, 'POST', data);

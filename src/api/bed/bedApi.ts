import { apiService } from '@/helpers/serviceMaker';

export const getBedList = async () => apiService(`/bed-data`, 'GET');

export const assignBed = async (id: string, data: any) =>
  apiService(`/assign-bed/${id}`, 'PUT', data);

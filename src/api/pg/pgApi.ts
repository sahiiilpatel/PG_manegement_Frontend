import { apiService } from '@/helpers/serviceMaker';

export const addPg = async (data: any) => apiService('/add-pg', 'POST', data);

export const getPgList = async () => apiService('/pg-list', 'GET');

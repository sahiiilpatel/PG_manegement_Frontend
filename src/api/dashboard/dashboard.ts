import { apiService } from '@/helpers/serviceMaker';

export const dashBoardApi = async () => apiService('/dashboard', 'GET');

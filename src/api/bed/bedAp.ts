import { apiService } from '@/helpers/serviceMaker';

export const getBedList = async () => apiService(`/bed-data`, 'GET');

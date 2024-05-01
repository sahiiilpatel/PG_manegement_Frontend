import { apiService } from '@/helpers/serviceMaker';

export const getSubscriptionPlanList = async () =>
  apiService(`/get-all-subscriptionplan`, 'GET');

export const checkout = async (data: any) =>
  apiService(`/payment/checkout`, 'POST', data);

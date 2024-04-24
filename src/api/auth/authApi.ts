import { apiService } from '@/helpers/serviceMaker';

export const login = async (data: any) =>
  apiService('/user/login', 'POST', data);

export const impersonateLogin = async (data: any) =>
  apiService('/user/impersonate-login', 'POST', data);

export const logOut = async (data: any) =>
  apiService('/user/logout', 'POST', data);

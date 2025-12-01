import request from './request'

export interface LoginResp {
  token: string;
  user: {
    id: number;
    nickname: string;
    username: string;
    role: string;
  };
}

export function login(data: { username: string; password: string }) {
  return request.post<LoginResp>('/auth/login', data);
}

export function register(data: any) {
  return request.post('/auth/register', data);
}

export function getMe() {
  return request.get('/auth/me');
}

import { instance } from '@/infra/api/instance';
import type { Login, Logout, SNSLoginRequest, SNSLoginResponse } from '@/infra/api/types/auth';

class authApi {
  logout = () => {
    return instance.post<Logout>('/mock');
  };
  login = () => {
    return instance.post<Login>('/mock');
  };
  reIssue = () => {
    return this.login();
  };
  snsLogin = (arg: SNSLoginRequest) => {
    const parameter = (Object.keys(arg) as (keyof SNSLoginRequest)[]).reduce(
      (acc, cur) => acc + `${cur}=${arg[cur]}&`,
      '?',
    );
    return instance.get<SNSLoginResponse>(`/auth/${arg.provider}${parameter.slice(0, parameter.length)}`);
  };
}

export default new authApi();

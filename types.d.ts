export interface IUserAuth {
  id: string;
  username: string;
  full_name: string;
  access_token: string;
  access_token_expired: number;
  refresh_token: string;
  refresh_token_expired: number;
}

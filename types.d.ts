export interface IUserAuth {
  id: string;
  username: string;
  full_name: string;
  access_token: string;
  access_token_expired: number;
  refresh_token: string;
  refresh_token_expired: number;
}

export interface IProduct {
  id: string;
  sku: string;
  name: string;
  description: string;
  stock: number;
  created_at: string;
  updated_at: string;
}

export interface IBranch {
  id: string;
  name: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface IBaseResponse {
  status: 'success' | 'error' | 'failed';
  message: string;
}

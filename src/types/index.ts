export enum UserRole {
  Branch = 'branch',
  Staff = 'staff',
  Supervisor = 'supervisor',
  SuperAdmin = 'superadmin',
}

export interface IMenu {
  route: string;
  label: string;
  roles: UserRole[];
}

export interface IBranch {
  id: string;
  name: string;
}

export interface IUserAuth {
  id: string;
  username: string;
  full_name: string;
  access_token: string;
  access_token_expired: number;
  refresh_token: string;
  refresh_token_expired: number;
  role: string;
  branch?: IBranch;
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

export interface IRequest {
  id: string;
  code: string;
  items: {
    id: string;
    product_name: string;
    quantity: number;
  }[];
  pickup_schedule: string;
  created_by: string;
  status_histories: {
    id: string;
    status: TStatus;
    remark: string | null;
    attachments: {
      id: string;
      url_file: string;
    }[];
    action_by: string;
    created_at: string;
  }[];
  created_at: string;
  updated_at: string;
  current_status: string;
}

export interface IBranch {
  id: string;
  name: string;
  address: string;
  created_at: string;
  updated_at: string;
}
export type TStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export interface ISummary {
  total_request: number;
  total_pending: number;
  total_approved: number;
  total_rejected: number;
  total_completed: number;
}

export interface IBaseResponse {
  status: 'success' | 'error' | 'failed';
  message: string;
}

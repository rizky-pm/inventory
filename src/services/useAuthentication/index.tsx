import { useMutation } from '@tanstack/react-query';
import api from '..';

type TypeSignInUser = {
  username: string;
  password: string;
};

type TypeSignInUserResponse = {
  data: {
    user: {
      id: string;
      username: string;
      full_name: string;
    };
    tokens: {
      access_token: string;
      access_token_expired: number;
      refresh_token: string;
      refresh_token_expired: number;
    };
  };
};

export const useSignInUser = () => {
  return useMutation({
    mutationFn: async (credentials: TypeSignInUser) => {
      const response = await api.post<TypeSignInUserResponse>(
        '/auth/login',
        credentials
      );

      return response.data;
    },
  });
};

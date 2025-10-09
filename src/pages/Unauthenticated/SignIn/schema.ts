import { z } from 'zod';

export const signInSchema = z.object({
  username: z.string().min(1, {
    error: (issue) => {
      if (issue.code === 'too_small') {
        return {
          message: 'Username is required',
        };
      }
    },
  }),
  password: z.string().min(1, {
    error: (issue) => {
      if (issue.code === 'too_small') {
        return {
          message: 'Password is required',
        };
      }
    },
  }),
});

export type TypeSignInSchema = z.infer<typeof signInSchema>;

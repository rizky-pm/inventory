import { z } from 'zod';

export const addBranchSchema = z.object({
  name: z.string().min(1, {
    error: (issue) => {
      if (issue.code === 'too_small') {
        return 'Branch name is required';
      }
    },
  }),
  address: z.string().min(1, {
    error: (issue) => {
      if (issue.code === 'too_small') {
        return 'Branch address is required';
      }
    },
  }),
});

export type AddBranchType = z.infer<typeof addBranchSchema>;

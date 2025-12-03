import z from 'zod';

export const searchBranchSchema = z.object({
  branchName: z.string().min(1, {
    error: (issue) => {
      if (issue.code === 'too_small') {
        return 'Branch name is required';
      }
    },
  }),
});

export type SearchBranchType = z.infer<typeof searchBranchSchema>;

import z from 'zod';

export const searchRequestSchema = z.object({
  requestCode: z.string().min(1, {
    error: (issue) => {
      if (issue.code === 'too_small') {
        return 'Request code is required';
      }
    },
  }),
});

export type SearchRequestType = z.infer<typeof searchRequestSchema>;

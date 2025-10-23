import { z } from 'zod';

export const searchProductSchema = z.object({
  productName: z.string().min(1, {
    error: (issue) => {
      if (issue.code === 'too_small') {
        return 'Product name is required';
      }
    },
  }),
});

export type SearchProductType = z.infer<typeof searchProductSchema>;

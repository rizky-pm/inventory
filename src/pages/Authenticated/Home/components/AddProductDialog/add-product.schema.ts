import { z } from 'zod';

export const addProductSchema = z.object({
  sku: z.string().min(1, {
    error: (issue) => {
      if (issue.code === 'too_small') {
        return 'Product SKU is required';
      }
    },
  }),
  name: z.string().min(1, {
    error: (issue) => {
      if (issue.code === 'too_small') {
        return 'Product name is required';
      }
    },
  }),
  description: z
    .string()
    .max(50, {
      error: (issue) => {
        if (issue.code === 'too_big') {
          return 'Product description is too long';
        }
      },
    })
    .optional(),
  stock: z.string().min(1, {
    error: (issue) => {
      if (issue.code === 'too_small') {
        return 'Product stock is required';
      }
    },
  }),
});

export type AddProductType = z.infer<typeof addProductSchema>;

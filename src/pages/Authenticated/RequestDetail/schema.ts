import z from 'zod';

const fileSchema = z.instanceof(File);

export const createRequestSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      qty: z.number().int().positive('Quantity must positive value'),
    })
  ),
  files: fileSchema,
  remarks: z.string().optional(),
});

export type TypeCreateRequestSchema = z.infer<typeof createRequestSchema>;

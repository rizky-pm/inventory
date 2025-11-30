import z from 'zod';

const fileSchema = z.instanceof(File, {
  error: () => {
    return 'Attachment of proof is required';
  },
});

export const completeRequestSchema = z.object({
  files: fileSchema,
  remarks: z.string().optional(),
});

export type TypeCompleteRequestSchema = z.infer<typeof completeRequestSchema>;

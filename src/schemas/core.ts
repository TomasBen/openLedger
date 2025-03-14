import { z } from 'zod';

/* integer values have to accept strings since controlled inputs in the forms fields require a default value, and setting an empty string as the default value for a number input is the "correct" or prefered way of doing it. See shadcn-ui/ui#410  https://github.com/shadcn-ui/ui/issues/410 */

export const productSchema = z.object({
  code: z
    .string({
      invalid_type_error: 'code must be a string',
    })
    .min(1, "code can't be blank"),
  name: z.optional(z.string()),
  description: z.optional(z.string()),
  amount: z.optional(z.number()),
  measure_unit: z.optional(z.string()),
  price: z.optional(z.number()),
  currency: z.string(), // <- default to 'main currency' per entity profile
  storage_unit: z.optional(z.string()),
});

export const clientSchema = z.object({
  id: z.string().min(5),
  name: z.string(),
  email: z.optional(z.string()),
  phone: z.optional(z.string()),
  address: z.optional(z.string()),
  industry: z.optional(z.string()),
  category: z.enum(['corporate', 'small business', 'unipersonal']),
  condition: z.optional(z.string()),
  entity_name: z.string(),
  created_at: z.string(),
});

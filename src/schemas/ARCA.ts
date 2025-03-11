import { z } from 'zod';

/* integer values have to accept strings since controlled inputs in the forms fields require a default value, and setting an empty string as the default value for a number input is the "correct" or prefered way of doing it. See:
shadcn-ui/ui#410  https://github.com/shadcn-ui/ui/issues/410 &
facebook/react#7779 https://github.com/facebook/react/issues/7779 */

export const factura = z
  .object({
    client: z.string(),
    concept: z.number().min(1).max(3),
    condition: z.enum([
      'Cuenta Corriente',
      'Contado',
      'Transferencia bancaria',
      'Tarjeta de débito',
      'Tarjeta de cŕedito',
      'Cheque',
      'Otra',
    ]),
    docType: z.number().min(0).max(99),
    docNum: z.number().min(0).max(99999999999), // implementar un tipo custom para cuits o DNIs: '{20|30|23}-{000000000}-{0^9}'
    startDate: z.date(),
    endDate: z.date(),
    prodId: z.number(),
    prodDesc: z.string(),
    prodPrice: z.number(),
  })
  .required()
  .refine((data) => data.startDate <= data.endDate, {
    message: "end date can't come before the start date",
    path: ['startDate', 'endDate'],
  });

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

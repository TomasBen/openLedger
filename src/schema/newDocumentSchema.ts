import { z } from 'zod';

export const factura = z.object({
  client: z.string(),
  concept: z.number().min(1).max(3),
  condition: z.enum(['Cuenta Corriente', 'Contado', 'Transferencia bancaria', 'Tarjeta de débito', 'Tarjeta de cŕedito', 'Cheque', 'Otra']),
  docType: z.number().min(0).max(99),
  docNum: z.number().min(0).max(99999999999), // implementar un tipo custom para cuits o DNIs: '{20|30|23}-{000000000}-{0^9}'
  startDate: z.date(),
  endDate: z.date(),
  prodId: z.number(),
  prodDesc: z.string(),
  prodPrice: z.number(),
}).required().refine(data => data.startDate <= data.endDate, { message: "end date can't come before the start date", path: ['startDate', 'endDate'] });

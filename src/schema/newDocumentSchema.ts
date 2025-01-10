import { z } from 'zod';

const factura = z.object({
  client: z.string(),
  doc: z.enum(['Factura', 'Nota de débito', 'Nota de cŕedito']),
  docNum: z.number().min(1).max(99),
  docType: z.enum(['A', 'B', 'C']),
  startDate: z.date(),
  endDate: z.date(),
  prodId: z.number(),
  prodDesc: z.string(),
  prodPrice: z.number(),
}).required().refine(data => data.startDate <= data.endDate, { message: "end date can't come before the start date", path: ['startDate', 'endDate'] });

export function parseFactura(object: any){
  const result = factura.safeParse(object)

  return result
}

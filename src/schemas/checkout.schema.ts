import { z } from 'zod';

export const checkoutSchema = z.object({
  contact_first_name: z.string().min(1, 'First name is required'),
  contact_last_name: z.string().min(1, 'Last name is required'),
  contact_email: z.email('Valid email required'),
  contact_phone: z.string().min(6, 'Phone is required'),
  shipping_address: z.string().min(1, 'Address is required'),
  shipping_city: z.string().min(1, 'City is required'),
  shipping_state: z.string().min(1, 'State is required'),
  shipping_zip_code: z.string().min(3, 'ZIP Code is required'),
  shipping_method: z.string().min(1),
  shipping_cost: z.number().nonnegative(),
  shipping_days: z.string().min(1),
  products: z
    .array(
      z.object({
        name: z.string(),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
        description: z.string().optional().default(''),
        product_id: z.string(),
      })
    )
    .min(1, 'At least one product required'),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

import { z } from 'zod';

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .min(2, 'Product name must be at least 2 characters')
    .max(100, 'Product name must be less than 100 characters'),
  
  category: z
    .string()
    .optional()
    .transform((val) => (val && val.trim().length > 0 ? val : 'all products')),
  
  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  
  price: z
    .number()
    .positive('Price must be a positive number')
    .min(0.01, 'Price must be at least $0.01')
    .max(9999.99, 'Price must be less than $10,000'),
  
  image: z
    .string()
    .min(1, 'Product image is required'),
  
  quantity: z
    .number()
    .int('Quantity must be a whole number')
    .min(0, 'Quantity must be at least 0')
    .max(9999, 'Quantity must be less than 10,000'),
  
  spice_level: z
    .number()
    .int('Spice level must be a whole number')
    .min(1, 'Spice level must be at least 1')
    .max(5, 'Spice level must be at most 5'),
  
  features: z
    .array(z.string().min(1, 'Feature cannot be empty'))
    .max(3, 'You can add at most 3 features')
    .optional()
    .default([]),
  
  popular: z
    .boolean()
    .default(false),
});

export const updateProductSchema = createProductSchema.partial().extend({
  id: z.string().min(1, 'Product ID is required'),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

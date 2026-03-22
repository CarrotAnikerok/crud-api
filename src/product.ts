import z from "zod"; 

enum CATEGORIES {
    electronics = 'electronics',
    books = 'books',
    clothing = 'clothing'
}

export const ProductSchema = z.object({
    id: z.uuid().optional().or(z.literal('')),
    name: z.string().min(1).trim(),
    description: z.string().min(1),
    price: z.number().positive(),
    category: z.enum(CATEGORIES),
    inStock: z.boolean(),
})

export type Product = z.infer<typeof ProductSchema>;
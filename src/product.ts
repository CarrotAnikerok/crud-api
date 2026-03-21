import z from "zod"; 

const Product = z.object({
    id: z.uuid().optional(),
    name: z.string().min(1).trim(),
    description: z.string().min(1),
    price: z.number().positive(),
    category: z.enum(['electronics', 'books', 'clothing']),
    inStock: z.boolean(),
})

export type Product = z.infer<typeof Product>;
import { Num, Str } from "chanfana";
import type { Context } from "hono";
import { z } from "zod";

export type AppContext = Context<{ Bindings: Env }>;

// Types generated automatically from Zod schemas
export type DimensionsType = z.infer<typeof DimensionsSchema>;
export type ReviewType = z.infer<typeof ReviewSchema>;
export type MetaType = z.infer<typeof MetaSchema>;
export type ProductType = z.infer<typeof ProductSchema>;
export type ProductsType = z.infer<typeof ProductsSchema>;
export type PaginatedProductsType = z.infer<typeof PaginatedProductsSchema>;

// Dimensions schema
export const DimensionsSchema = z.object({
  width: Num({
    required: true,
    description: "Width of the product",
    example: 10.5,
  }),
  height: Num({
    required: true,
    description: "Height of the product",
    example: 5.2,
  }),
  depth: Num({
    required: true,
    description: "Depth of the product",
    example: 3.8,
  }),
});

// Review schema
export const ReviewSchema = z.object({
  rating: Num({
    required: true,
    description: "Rating from 1 to 5",
    example: 4,
  }),
  comment: Str({
    required: true,
    description: "Review comment",
    example: "Great product, highly recommended",
  }),
  date: Str({
    required: true,
    description: "Review date",
    example: "2023-05-15",
  }),
  reviewerName: Str({
    required: true,
    description: "Name of the reviewer",
    example: "John Doe",
  }),
  reviewerEmail: Str({
    required: true,
    description: "Email of the reviewer",
    example: "john.doe@example.com",
  }),
});

// Meta schema
export const MetaSchema = z.object({
  createdAt: Str({
    required: true,
    description: "Creation date",
    example: "2023-05-15T10:30:00Z",
  }),
  updatedAt: Str({
    required: true,
    description: "Last update date",
    example: "2023-05-16T14:20:00Z",
  }),
  barcode: Str({
    required: true,
    description: "Product barcode",
    example: "123456789012",
  }),
  qrCode: Str({
    required: true,
    description: "Product QR code",
    example: "https://example.com/qr/product123",
  }),
});

// Product schema
export const ProductSchema = z.object({
  id: Num({ required: true, description: "Product ID", example: 1 }),
  title: Str({
    required: true,
    description: "Product title",
    example: "iPhone 13 Pro",
  }),
  description: Str({
    required: true,
    description: "Product description",
    example: "Latest iPhone model with advanced features",
  }),
  category: Str({
    required: true,
    description: "Product category",
    example: "Electronics",
  }),
  price: Num({ required: true, description: "Product price", example: 999.99 }),
  discountPercentage: Num({
    required: true,
    description: "Discount percentage",
    example: 10.5,
  }),
  rating: Num({
    required: true,
    description: "Average product rating",
    example: 4.7,
  }),
  stock: Num({ required: true, description: "Available stock", example: 50 }),
  tags: z.array(
    Str({
      required: false,
      description: "Product tag",
      example: "beauty",
    })
  ),
  brand: Str({
    required: false,
    description: "Product brand",
    example: "Apple",
  }),
  sku: Str({
    required: false,
    description: "Stock keeping unit",
    example: "IPHONE13-PRO-256",
  }),
  weight: Num({ required: true, description: "Product weight", example: 0.35 }),
  dimensions: DimensionsSchema,
  warrantyInformation: Str({
    required: false,
    description: "Warranty details",
    example: "1 year limited warranty",
  }),
  shippingInformation: Str({
    required: false,
    description: "Shipping details",
    example: "Free shipping for orders over $50",
  }),
  availabilityStatus: Str({
    required: false,
    description: "Product availability status",
    example: "In Stock",
  }),
  reviews: z.array(ReviewSchema),
  returnPolicy: Str({
    required: false,
    description: "Return policy",
    example: "30 days money back guarantee",
  }),
  minimumOrderQuantity: Num({
    required: false,
    description: "Minimum order quantity",
    example: 1,
  }),
  meta: MetaSchema,
  images: z.array(
    Str({
      required: false,
      description: "Product images URLs",
      example: "https://example.com/image.jpg",
    })
  ),
  thumbnail: Str({
    required: true,
    description: "Product thumbnail URL",
    example: "https://example.com/thumb.jpg",
  }),
});

// Products schema
export const ProductsSchema = z.object({
  products: z.array(ProductSchema),
});

// PaginationSchema schema
export const PaginationSchema = z.object({
  skip: Num({
    required: true,
    description: "Number of products skipped",
    example: 0,
  }),
  limit: Num({
    required: true,
    description: "Maximum number of products returned",
    example: 20,
  }),
});

// PaginatedProducts schema
export const PaginatedProductsSchema = z
  .object({
    products: z.array(ProductSchema),
    total: Num({
      required: true,
      description: "Total number of products",
      example: 80,
    }),
  })
  .merge(PaginationSchema);

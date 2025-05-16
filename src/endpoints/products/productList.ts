import { env } from "cloudflare:workers";
import { OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";

import {
  PaginatedProductsSchema,
  PaginatedProductsType,
  PaginationSchema,
  type AppContext,
} from "@/common/types";

export class ProductList extends OpenAPIRoute {
  schema = {
    tags: ["products"],
    summary: "List products",
    request: {
      query: PaginationSchema.partial(),
      headers: z.object({
        "X-API-Key": z.string().describe("API Key for authentication"),
      }),
    },
    responses: {
      "200": {
        description: "Returns a list of products",
        content: {
          "application/json": {
            schema: PaginatedProductsSchema,
          },
        },
      },
      "401": {
        description: "Unauthorized access",
        content: {
          "application/json": {
            schema: z.object({
              message: Str({
                description: "Error message",
                example: "Invalid API Key!",
              }),
            }),
          },
        },
      },
      "500": {
        description: "Returns an error message",
        content: {
          "application/json": {
            schema: z.object({
              message: Str({
                description: "Error message",
                example: "Something went wrong",
              }),
            }),
          },
        },
      },
    },
  };

  async handle(c: AppContext) {
    const data = await this.getValidatedData<typeof this.schema>();
    try {
      const products = await this.getProductData(
        data.query.skip,
        data.query.limit
      );
      return c.json(products);
    } catch (error) {
      c.status(500);
      return c.json({ message: "Something went wrong" });
    }
  }

  async getProductData(
    skip: number = 0,
    limit: number = 20
  ): Promise<PaginatedProductsType> {
    // Ensure limit doesn't exceed maximum allowed value
    limit = Math.min(limit, 20);

    const response = await fetch(
      `${env.BASE_URL}/products?skip=${skip}&limit=${limit}`
    );

    // Throw error if request failed
    if (response.status !== 200) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    return response.json() as PaginatedProductsType;
  }
}

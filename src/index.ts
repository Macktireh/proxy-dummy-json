import { fromHono } from "chanfana";
import { Hono } from "hono";

import { onError } from "@/common/errors";
import { product } from "@/endpoints/products";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
  redoc_url: "/",
  docs_url: "/swagger",
  openapi_url: "/openapi.json",
});

// Register Jobs endpoints
openapi.route("/products", product);

// Error handling
app.onError(onError);

// Export the Hono app
export default app;

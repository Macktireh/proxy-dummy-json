import { fromHono } from "chanfana";
import { Hono } from "hono";

import { ProductList } from "@/endpoints/products/productList";
import { UnauthorizedError } from "@/common/errors";
import { env } from "cloudflare:workers";

const app = new Hono()

app.use(async (c, next) => {
  const { apikey } = c.req.query();
  const url = new URL(c.req.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  if (!apikey)
    throw new UnauthorizedError(`Missing API Key! Check the docs: ${baseUrl}`);
  if (apikey !== env.SECRET_KEY)
    throw new UnauthorizedError("Invalid API Key!");
  await next();
});

export const product = fromHono(app, {});

product.get("", ProductList);

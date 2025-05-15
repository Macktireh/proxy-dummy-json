# Cloudflare Workers OpenAPI

A simple REST API built with Cloudflare Workers, Hono, and Chanfana for OpenAPI documentation.

## Features

- OpenAPI documentation with Swagger UI and ReDoc
- API schema validation with Zod
- Robust error handling
- Pagination support
- Authentication with API keys

## Tech Stack

- [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless platform
- [Hono](https://hono.dev/) - Lightweight web framework
- [Chanfana](https://github.com/cloudflare/chanfana) - OpenAPI integration for Hono
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- Wrangler CLI (Cloudflare Workers development tool)

### Installation

1. Clone the repository
  ```bash
  git clone https://github.com/Macktireh/proxy-dummy-json.git
  cd proxy-dummy-json
  ```

2. Install dependencies
  ```bash
  npm install
  ```

3. Set up your environment variables
  ```bash
  # Create a .dev.vars file for local development
  echo "SECRET_KEY=your_api_key_here" > .dev.vars
  ```

### Development

Start the development server:
  ```bash
  npm run dev
  ```

### Deployment

Deploy to Cloudflare Workers:
  ```bash
  npm run deploy
  ```

You can also use GitHub Actions for CI/CD deployment (see `.github/workflows/deploy.yml`).

## API Documentation

Once deployed, you can access the API documentation at:

- ReDoc UI: `https://your-worker-url/`
- Swagger UI: `https://your-worker-url/swagger`
- OpenAPI JSON: `https://your-worker-url/openapi.json`

## API Usage

All endpoints require an API key:

```
GET /products?apikey=your_api_key_here
```

### List Products

```
GET /products?apikey=your_api_key_here&skip=0&limit=20
```

Query parameters:
- `skip` (optional): Number of products to skip (default: 0)
- `limit` (optional): Maximum number of products to return (default: 20, max: 20)

## License

[MIT](LICENSE)
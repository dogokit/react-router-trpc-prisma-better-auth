React Router v7 + tRPC + Better Auth + Prisma!

A modern template for building full-stack React applications using React Router v7 with tRPC, Better Auth and Prisma .

## Getting Started

### Environment Variables

Crucially, replace "BetterAuth Secret" with a strong, randomly generated secret. Use openssl or the secret generator in the BetterAuth documentation to create a secure secret. Do not use the placeholder value in a production environment!

To use Google as a social provider, you need to get your Google credentials. You can get them by creating a new project in the Google Cloud Console.
In the Google Cloud Console > Credentials > Authorized redirect URIs, make sure to set the redirect URL to http://localhost:5173/api/auth/callback/google for local development. For production, make sure to set the redirect URL as your application domain, e.g. https://example.com/api/auth/callback/google. If you change the base path of the auth routes, you should update the redirect URL accordingly.

This repo is using Neon Postgres as our database. make sure to replace the placeholder connection string with your actual Neon Postgres connection string.

### Installation

Install the dependencies:

```bash
npm install
npx prisma db push
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.

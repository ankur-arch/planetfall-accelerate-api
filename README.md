# Cloudflare Accelerate API

## Getting Started

To begin, follow these steps:

1. **Install Dependencies**: Make sure you have the required dependencies by running the following command:

   ```bash
   yarn install
   ```

2. **Configuration Files**: Create two local configuration files: `.dev.vars` and `.env`. Add the following essential variables to each of them:

   For `.dev.vars`:

   ```bash
   DIRECT_URL=
   DATABASE_URL=
   ```

   For `.env`:
   > Required to carry out migrations

   ```bash
   DIRECT_URL=
   DATABASE_URL=
   ```

3. **Preparing Prisma**: Set up the Prisma environment by executing the following commands:

   ```bash
   yarn prisma migrate dev
   yarn prisma generate --accelerate
   ```

## Starting the Server

To launch the server and test your Cloudflare Accelerate API, run the following command:

```bash
yarn start
```

## Deployment to Cloudflare

Once you're satisfied with your API and want to make it available through Cloudflare, utilize the following command for deployment:

```bash
yarn deploy
```

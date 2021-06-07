# My Covid Story

This is an extremely early MVP, so there is a lot to do.

Our stack / architecture is:

- [NextJS](https://next.js.org/) hosted on [Vercel](https://vercel.com) (already setup here)
- [Prisma](https://prisma.io) as our ORM (makes things pretty smooth)
- [PostgreSQL](https://www.postgresql.org/) Managed Database from [Digital Ocean](https://www.digitalocean.com/).

## Quick Start

1. Clone this repo.
1. Install dependencies with `npm i`.
1. Copy `.env.template` to `.env`.
1. Get a local postgres db running.
   Docker is probably easiest, but local postgres would also work.
   With Docker installed, run `docker run --name my-covid-story-dev -p 5432:5432 -e POSTGRES_PASSWORD=mycovidstory -d postgres:12.6-alpine` (this will match the DB URL string in `.env`).
1. Run `npx prisma migrate deploy` to apply migrations in `prisma/migrations`.
1. Run `npx prisma db seed --preview-feature` to see test data from `prisma/seed.ts`.
1. Run `npm run dev` to start the dev server.
   Open http://localhost:3000 in your browser to see the app.
1. Run `npm test` to run the test suite.
   This also gets run automatically on each Pull Request.

## Prisma Migrate

We use [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate) to manage the evolution of our database schema.
To work around a [current limitation](https://github.com/prisma/prisma/issues/7351) in Prisma, we exclude certain relation fields from the schema when running `prisma migrate`.

These fields are marked with a `//nomigrate` comment in the `schema.prisma` file.
Excluding them is handled automatically by the `prisma.sh` wrapper script for the prisma CLI.
For simplicity, you can always use `./prisma.sh` intead of `npx prisma` and the script will do the right thing.

## Learn More

This is a [Next.js](https://nextjs.org/) application bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and deployed on the [Vercel Platform](https://vercel.com/).
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js deployment documentation](https://nextjs.org/docs/deployment) - deployment on Vercel.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

[![https://vercel.com?utm_source=my-covid-story&utm_campaign=oss](./public/powered-by-vercel.svg)](https://vercel.com?utm_source=my-covid-story&utm_campaign=oss)

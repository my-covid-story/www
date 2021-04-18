# My Covid Story

This is an extremely early MVP, so there is a lot to do.

Our prosposed stack / architecture is:

- [NextJS](https://next.js.org/) hosted on [Vercel](https://vercel.com) (already setup here)
- [Prisma](https://prisma.io) as our ORM (makes things pretty smooth)
- Postgresql as a DB

Contact @mwickett on Slack for access to the Vercel team, or the GitHub org if you're interested.

## Todo

- [ ] Add Prisma - see [example](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes)
- [x] ~Decide if we're using Typescript~ Yes!

## Contributing

1. Clone this repo
2. Install dependencies with `npm i`
3. Rename `.env.template` to `.env` (soon we'll switch to a postgresql db, but for now it's using sqlite locally)
4. Run `npx prisma migrate dev --name init` to scaffold a local sqlite db on your machine
5. Run `npx prisma db seed --preview-feature` to see test data from `prisma/seed.ts`
6. Run `npm run dev` to start the app locally
7. You can use `/api/story` to create new stories

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

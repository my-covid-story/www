import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.StoryCreateInput[] = [
  {
    content: 'This is a covid story',
    email: 'alice@test.io',
    approved: true
  },
  {
    content: 'This is a covid story',
    phone: '5195551122',
    approved: true
  },
  {
    content: 'This is a covid story',
    twitter: 'alicetest',
    approved: true
  },
  {
    content: 'This story has an image',
    approved: true
  },
  {
    content: 'NOT APPROVED This story has an image',
    approved: false
  },
  {
    content: 'NOT APPROVEDThis story has an image',
    approved: false
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.story.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

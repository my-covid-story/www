import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.StoryCreateInput[] = [
  {
    title: 'Here is our first story',
    content:
      'This command deletes and recreates the database, or performs a soft reset by removing all data, tables, indexes, and other artifacts.',
    postal: 'N6A',
    category: 'doctor',
    email: 'alice@test.io',
    anonymous: false,
    name: 'Alice munro',
    contact: false,
    approved: true,
  },
  {
    title: 'Here is our second story',
    content:
      'This command deletes and recreates the database, or performs a soft reset by removing all data, tables, indexes, and other artifacts.',
    postal: 'N6A',
    category: 'worker',
    email: 'alice@test.io',
    anonymous: true,
    contact: false,
    approved: true,
  },
  {
    title: 'Here is our first story',
    content:
      'This command deletes and recreates the database, or performs a soft reset by removing all data, tables, indexes, and other artifacts.',
    postal: 'N6A',
    category: 'doctor',
    email: 'alice@test.io',
    anonymous: false,
    name: 'Alice munro',
    contact: false,
    approved: true,
  },
  {
    title: 'Here is our third story',
    content:
      'This command deletes and recreates the database, or performs a soft reset by removing all data, tables, indexes, and other artifacts.',
    postal: 'N6A',
    category: 'doctor',
    email: 'alice@test.io',
    anonymous: false,
    name: 'Alice munro',
    contact: false,
    approved: false,
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

import { Prisma, PrismaClient } from '@prisma/client'
import faker from 'faker'
const prisma = new PrismaClient()

const postalPrefixes = ['L7A', 'P6A', 'M4G', 'K7H', 'N1S', 'L4B', 'G3J']

const categories = [
  'concerned-citizen',
  'essential-worker',
  'healthcare-provider',
  'educator',
  'small-business-owner',
  'patient-family-member',
  'other',
]

const NUMBER_SEEDS = 200

const seedData: Prisma.StoryCreateInput[] = []

for (let i = 0; i < NUMBER_SEEDS; i++) {
  const anonymous = faker.datatype.boolean()
  const contact = faker.datatype.boolean()
  const name = faker.fake('{{name.firstName}} {{name.lastName}}')
  const seed = {
    title: faker.lorem.words(getRandomInt(2, 20)).substring(0, 75),
    content: faker.lorem.words(getRandomInt(3, 900)),
    postal: postalPrefixes[getRandomInt(0, postalPrefixes.length - 1)],
    category: categories[getRandomInt(0, categories.length - 1)],
    email: contact ? faker.internet.email() : null,
    displayName: anonymous ? null : name,
    contactName: contact ? name : null,
    approved: faker.datatype.boolean(),
    contentWarning: faker.datatype.boolean(),
  }
  seedData.push(seed)
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function main() {
  console.log(`Start seeding ...`)
  for (const s of seedData) {
    const story = await prisma.story.create({
      data: s,
    })
    console.log(`Created story with id: ${story.id}`)
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

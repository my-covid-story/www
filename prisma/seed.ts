import path from 'path'
import fs from 'fs/promises'
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

const STORY_COUNT = 200

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function seedStories() {
  console.log('Creating stories')
  const seedData: Prisma.StoryCreateInput[] = []

  for (let i = 0; i < STORY_COUNT; i++) {
    const anonymous = faker.datatype.boolean()
    const contact = faker.datatype.boolean()
    const name = faker.fake('{{name.firstName}} {{name.lastName}}')
    const approved = faker.datatype.boolean()
    const seed = {
      title: faker.lorem.words(getRandomInt(2, 20)).substring(0, 75),
      content: faker.lorem.words(getRandomInt(3, 900)),
      postal: postalPrefixes[getRandomInt(0, postalPrefixes.length - 1)],
      category: categories[getRandomInt(0, categories.length - 1)],
      email: contact ? faker.internet.email() : null,
      displayName: anonymous ? null : name,
      contactName: contact ? name : null,
      approved,
      contentWarning: faker.datatype.boolean(),
      mppMessageId: approved && faker.datatype.boolean() ? faker.random.alphaNumeric(22) : null,
    }
    seedData.push(seed)
  }

  for (const data of seedData) {
    await prisma.story.create({ data })
  }
}

async function seedStaticData() {
  const content = await fs.readFile(path.join(__dirname, 'postal-data.json'), 'utf8')
  const data = JSON.parse(content)

  console.log('Deleting postal code-riding mappings')
  await prisma.postalCodeToRiding.deleteMany({})

  console.log('Deleting ridings')
  await prisma.riding.deleteMany({})

  console.log('Deleting postal codes')
  await prisma.postalCode.deleteMany({})

  console.log('Creating postal codes')
  for (const postalCode of data.postalCode) {
    const data = postalCode as Prisma.PostalCodeCreateInput
    await prisma.postalCode.create({ data })
  }

  console.log('Creating ridings')
  for (const riding of data.riding) {
    const data = riding as Prisma.RidingCreateInput
    await prisma.riding.create({ data })
  }

  console.log('Creating postal code-riding mappings')
  for (const mapping of data.postalCodeToRiding) {
    const data = mapping as Prisma.PostalCodeToRidingCreateInput
    await prisma.postalCodeToRiding.create({ data })
  }
}

async function seed() {
  const env = process.env.NODE_ENV
  const prod = env === 'production'
  console.log(`Environment: ${env}`)
  console.log(prod ? 'Seeding static data only' : 'Seeding static data and stories')
  console.log()
  await seedStaticData()

  if (!prod) {
    await seedStories()
  }
  console.log('Done')
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

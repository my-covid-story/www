import faker from 'faker'
import prisma from './prisma'
import generateSocial from './social'

const categories = [
  'concerned-citizen',
  'essential-worker',
  'healthcare-provider',
  'educator',
  'small-business-owner',
  'patient-family-member',
  'other',
]

afterAll(async (done) => {
  await prisma.$disconnect()
  done()
})

describe('Test Social Sharing', () => {
  beforeEach(async () => {
    return await prisma.story.create({
      data: {
        email: 'test@test.test',
        title: 'test',
        content: 'this is content',
        postal: 'A1A',
        category: categories[Math.floor(Math.random() * categories.length)],
      },
    })
  })

  test('generateSocial should generate text less than 280 characters', async () => {
    const savedStory = await prisma.story.findFirst({
      where: { email: 'test@test.test' },
    })

    savedStory.content = faker.lorem.words(300)
    savedStory.displayName = faker.lorem.words(300)

    expect(generateSocial(savedStory).length).toBeLessThanOrEqual(280)
  })

  test('generateSocial should generate text without a display name', async () => {
    const savedStory = await prisma.story.findFirst({
      where: { email: 'test@test.test' },
    })

    const expectedString = `"this is content" From ${savedStory.postal}`

    expect(generateSocial(savedStory)).toBe(expectedString)
  })

  test('generateSocial should generate text with a display name', async () => {
    const savedStory = await prisma.story.findFirst({
      where: { email: 'test@test.test' },
    })

    savedStory.displayName = 'Name'

    const expectedString = `"this is content" ${savedStory.displayName} from ${savedStory.postal}`

    expect(generateSocial(savedStory)).toBe(expectedString)
  })

  test('generateSocial should generate text less than 280 characters with long Display Name', async () => {
    const savedStory = await prisma.story.findFirst({
      where: { email: 'test@test.test' },
    })

    savedStory.content = faker.lorem.words(300)

    expect(generateSocial(savedStory).length).toBeLessThanOrEqual(280)
  })
})

export {}

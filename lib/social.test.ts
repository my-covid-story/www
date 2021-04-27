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

  test('generateSocial should generate text of 150 characters', async () => {
    const savedStory = await prisma.story.findFirst({
      where: { email: 'test@test.test' },
    })

    expect(generateSocial(savedStory).length).toBeLessThanOrEqual(150)
  })
})

export {}

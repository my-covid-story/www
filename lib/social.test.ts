import faker from 'faker'
import { testStory } from './model/story'
import generateSocial from './social'

describe('Test Social Sharing', () => {
  test('generateSocial should generate text less than 280 characters', () => {
    const savedStory = testStory({
      content: faker.lorem.words(300),
      displayNmae: faker.lorem.words(300),
    })
    expect(generateSocial(savedStory).length).toBeLessThanOrEqual(280)
  })

  test('generateSocial should generate text without a display name', () => {
    const savedStory = testStory()
    const expectedString = `"This is content." From ${savedStory.postal}`
    expect(generateSocial(savedStory)).toBe(expectedString)
  })

  test('generateSocial should generate text with a display name', () => {
    const savedStory = testStory({ displayName: 'Name' })
    const expectedString = `"This is content." ${savedStory.displayName} from ${savedStory.postal}`
    expect(generateSocial(savedStory)).toBe(expectedString)
  })

  test('generateSocial should generate text less than 280 characters with long Display Name', () => {
    const savedStory = testStory({ content: faker.lorem.words(300) })
    expect(generateSocial(savedStory).length).toBeLessThanOrEqual(280)
  })
})

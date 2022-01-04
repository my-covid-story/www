import { testStory, storyProvince, fixTitle } from './story'

describe('testStory()', () => {
  test('creates a story for testing with basic required properties', () => {
    const story = testStory()
    expect(story).toHaveProperty('id', expect.any(String))
    expect(story).toHaveProperty('createdAt', expect.any(Date))
    expect(story).toHaveProperty('updatedAt', expect.any(Date))
    expect(story).toHaveProperty('title', expect.any(String))
    expect(story).toHaveProperty('content', expect.any(String))
    expect(story).toHaveProperty('postal', expect.any(String))
    expect(story).toHaveProperty('category', expect.any(String))
  })

  test('supports overriding any property values', () => {
    const story = testStory({
      title: 'My title',
      content: 'This is the content of my story.',
    })
    expect(story).toHaveProperty('title', 'My title')
    expect(story).toHaveProperty('content', 'This is the content of my story.')
  })
})

describe('storyProvince()', () => {
  test("determines the province from the first letter of the story's postal code", () => {
    const story = testStory({ postal: 'V6B' })
    expect(storyProvince(story)).toBe('BC')
  })

  test('determines the province in spite of an invalid third digit', () => {
    const story = testStory({ postal: 'H1D' })
    expect(storyProvince(story)).toBe('QC')
  })

  test('correctly identifies all five first letters for Ontario', () => {
    expect(storyProvince(testStory({ postal: 'K1A' }))).toBe('ON')
    expect(storyProvince(testStory({ postal: 'L1A' }))).toBe('ON')
    expect(storyProvince(testStory({ postal: 'M1A' }))).toBe('ON')
    expect(storyProvince(testStory({ postal: 'N1A' }))).toBe('ON')
    expect(storyProvince(testStory({ postal: 'P1A' }))).toBe('ON')
  })

  test('correctly identifies one of the specific Nunavut X postal codes', () => {
    const story = testStory({ postal: 'X0B' })
    expect(storyProvince(story)).toBe('NU')
  })

  test('indentifies other X postal codes as Northwest Territories', () => {
    const story = testStory({ postal: 'X1A' })
    expect(storyProvince(story)).toBe('NT')
  })

  test("return undefined if the first letter of the story's postal code is invalid", () => {
    const story = testStory({ postal: 'F4C' })
    expect(storyProvince(story)).toBeUndefined()
  })

  test('correctly handles a postal code that is not uppercase', () => {
    const story = testStory({ postal: 'm5v' })
    expect(storyProvince(story)).toBe('ON')
  })

  test('correctly handles a full postal code', () => {
    const story = testStory({ postal: 'X0B 1B0' })
    expect(storyProvince(story)).toBe('NU')
  })

  test('returns the province from a known postal code instead of determining it again', () => {
    const postalCode = {
      code: 'M5V',
      province: 'OO',
      type: 'urban',
      hotspot: true,
      name: 'Somewhere Else',
    }
    const story = testStory({ postal: 'M5V', postalCode })
    expect(storyProvince(story)).toBe('OO')
  })
})

describe('fixTitle()', () => {
  test('returns a clean title unchanged', () => {
    const title = 'This is my story'
    expect(fixTitle(title)).toBe(title)
  })

  test('trims whitespace from the beginning and end of the title', () => {
    expect(fixTitle('  This is my story\n')).toBe('This is my story')
  })

  test('removes matched straight single quotes from around the title', () => {
    expect(fixTitle("'This is my story'")).toBe('This is my story')
  })

  test('removes matched curly single quotes from around the title', () => {
    expect(fixTitle('‘This is my story’')).toBe('This is my story')
  })

  test('removes matched straight double quotes from around the title', () => {
    expect(fixTitle('"This is my story"')).toBe('This is my story')
  })

  test('removes matched curly double quotes from around the title', () => {
    expect(fixTitle('“This is my story”')).toBe('This is my story')
  })

  test('removes matched quotes inside from around the title within trimmed whitespace', () => {
    expect(fixTitle('  ‘This is my story’\t')).toBe('This is my story')
  })

  test('does not remove an unmatched quote from the start of the title', () => {
    const title = "'Why,' I wonder."
    expect(fixTitle(title)).toBe(title)
  })

  test('does not remove an unmatched quote from the end of the title', () => {
    const title = 'I wonder, ‘why’?'
    expect(fixTitle(title)).toBe(title)
  })

  test('removes matched quotes inside from around the title within trimmed whitespace', () => {
    expect(fixTitle("  'This is my story’\t")).toBe('This is my story')
  })

  test('trims whitespace within removed quotes from around the title', () => {
    expect(fixTitle('“ This is my story\n"')).toBe('This is my story')
  })

  test('converts all internal double quotes to the corresponding single quote', () => {
    const expected = "‘Here,’ she said. 'Why?' I wondered."
    expect(fixTitle('“Here,” she said. "Why?" I wondered.')).toBe(expected)
  })

  test('collapses each internal whitespace occurence to a single space', () => {
    expect(fixTitle('This   is \nmy\tstory')).toBe('This is my story')
  })

  test('handles a title requiring multiple fixes', () => {
    expect(fixTitle('\n\'"Why?" \r‘Why not?’  \'\n')).toBe("'Why?' ‘Why not?’")
  })
})

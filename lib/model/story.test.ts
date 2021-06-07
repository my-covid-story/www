import { testStory, fixTitle } from './story'

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
    const story = testStory({ title: 'My title', content: 'This is the content of my story.' })
    expect(story).toHaveProperty('title', 'My title')
    expect(story).toHaveProperty('content', 'This is the content of my story.')
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

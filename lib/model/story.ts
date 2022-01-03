import { Prisma } from '@prisma/client'

export const SELECT = {
  id: true,
  createdAt: true,
  updatedAt: true,
  title: true,
  content: true,
  postal: true,
  postalCode: true,
  category: true,
  displayName: true,
  approved: true,
  viewCount: true,
  contentWarning: true,
  mppMessageId: true,
}

export type Story = Prisma.StoryGetPayload<{ select: typeof SELECT }>

const BASE_TEST_STORY: Story = {
  id: 'ckoegrn6m00001gma67doeug5',
  createdAt: new Date('2021-06-01T16:19:08.062Z'),
  updatedAt: new Date('2021-06-01T17:35:41.768Z'),
  title: 'Story title',
  content: 'This is content.',
  postal: 'M5V',
  postalCode: null,
  category: 'patient-family-member',
  displayName: null,
  approved: true,
  viewCount: 0,
  contentWarning: false,
  mppMessageId: null,
}

export function testStory(overrides = {}): Story {
  return { ...BASE_TEST_STORY, ...overrides }
}

// Nunavut/Northwest Territories share a first letter, so a function is needed to disambiguate.
const POSTAL_PROVINCE = {
  A: 'NL',
  B: 'NS',
  C: 'PE',
  E: 'NB',
  G: 'QC',
  H: 'QC',
  J: 'QC',
  K: 'ON',
  L: 'ON',
  M: 'ON',
  N: 'ON',
  P: 'ON',
  R: 'MB',
  S: 'SK',
  T: 'AB',
  V: 'BC',
  X: (postal) => (['X0A', 'X0B', 'X0C'].includes(postal) ? 'NU' : 'NT'),
  Y: 'YT',
}

export function storyProvince({
  postal,
  postalCode,
}: Story): string | undefined {
  postal = postal.substring(0, 3).toUpperCase()
  if (postalCode) {
    return postalCode.province
  }
  const province = POSTAL_PROVINCE[postal.charAt(0)]
  return typeof province === 'function' ? province(postal) : province
}

const QUOTES = {
  single: '\u0027',
  singleLeft: '\u2018',
  singleRight: '\u2019',
  double: '\u0022',
  doubleLeft: '\u201C',
  doubleRight: '\u201D',
}

const SINGLE_QUOTES = [QUOTES.single, QUOTES.singleLeft, QUOTES.singleRight]
const DOUBLE_QUOTES = [QUOTES.double, QUOTES.doubleLeft, QUOTES.doubleRight]

export function fixTitle(title = '') {
  title = title.trim()
  const first = title.charAt(0)
  const last = title.charAt(title.length - 1)
  if (
    (SINGLE_QUOTES.includes(first) && SINGLE_QUOTES.includes(last)) ||
    (DOUBLE_QUOTES.includes(first) && DOUBLE_QUOTES.includes(last))
  ) {
    title = title.substring(1, title.length - 1)
  }
  return title
    .trim()
    .replace(/\s+/g, ' ')
    .replace(new RegExp(QUOTES.double, 'g'), QUOTES.single)
    .replace(new RegExp(QUOTES.doubleLeft, 'g'), QUOTES.singleLeft)
    .replace(new RegExp(QUOTES.doubleRight, 'g'), QUOTES.singleRight)
}

export const ADMIN_INCLUDE = {
  postalCode: {
    include: {
      ridings: {
        include: {
          riding: true,
        },
      },
    },
  },
}

export type AdminStory = Prisma.StoryGetPayload<{
  include: typeof ADMIN_INCLUDE
}>

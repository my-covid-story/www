import { Story } from '@prisma/client'

export const categoryLabel = {
  'concerned-citizen': 'Concerned Citizen',
  'essential-worker': 'Essential Worker',
  'healthcare-provider': 'Healthcare Provider',
  educator: 'Educator',
  'small-business-owner': 'Small Business Owner',
  'patient-family-member': 'Patient or Family Member',
}

export function storyCategoryLabel({ category }: Story) {
  return categoryLabel[category] || 'Other'
}

export function storyImage({ category }: Story) {
  switch (category) {
    case 'concerned-citizen':
    case 'essential-worker':
    case 'healthcare-provider':
    case 'educator':
    case 'small-business-owner':
    case 'patient-family-member':
      return `/img/categories/${category}.jpg`
    case 'other':
    default:
      return '/img/categories/other.jpg'
  }
}

export function storyName({ displayName }: Story) {
  return displayName || 'Anonymous'
}

export function storyCite({ displayName, category, postal }: Story) {
  if (displayName) return `${displayName} from ${postal}`
  const cl = categoryLabel[category]
  return cl ? `${cl} from ${postal}` : `From ${postal}`
}

export function storyDate({ createdAt }: Story) {
  return new Date(createdAt).toDateString()
}

export function storyParagraphs({ content }: Story) {
  return content.split('\n').filter((p) => p)
}

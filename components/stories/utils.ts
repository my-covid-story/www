import { Story } from '../../lib/model/story'

export const categoryLabel = {
  'concerned-citizen': 'Concerned Citizen',
  'essential-worker': 'Essential Worker',
  'healthcare-provider': 'Healthcare Provider',
  educator: 'Educator',
  'small-business-owner': 'Small Business Owner',
  'patient-family-member': 'Patient or Family Member',
}

export function storyCategoryLabel({ category }: Story): string {
  return categoryLabel[category] || 'Other'
}

export function storyImage({ category }: Story): string {
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

export function storyName({ displayName }: Story): string {
  return displayName || 'Anonymous'
}

export function storyLocation({ postal, postalCode }: Story) {
  return postalCode ? `${postalCode.name}, ${postalCode.province}` : postal
}

export function storyLocationLabels({ postal, postalCode }: Story) {
  const labels = []
  if (postalCode) {
    labels.push(postalCode.name)
  }
  labels.push(postal)
  return labels
}

export function storyCite(story: Story) {
  const { displayName } = story
  const location = storyLocation(story)
  return displayName ? `${displayName} from ${location}` : `From ${location}`
}

export function storyDate({ createdAt }: Story): string {
  return new Date(createdAt).toDateString()
}

export function storyParagraphs({ content }: Story): string[] {
  return content.split('\n').filter((p) => p)
}

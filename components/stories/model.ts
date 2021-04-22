export function storyCategory({ category }) {
  switch (category) {
    case 'concerned-citizen':
      return 'Concerned Citizen'
    case 'essential-worker':
      return 'Essential Worker'
    case 'healthcare-provider':
      return 'Healthcare Provider'
    case 'educator':
      return 'Educator'
    case 'small-business-owner':
      return 'Small Business Owner'
    case 'patient-family-member':
      return 'Patient or Family Memeber'
    case 'other':
    default:
      return 'Other'
  }
}

export function storyImage({ category }) {
  switch (category) {
    case 'concerned-citizen':
    case 'essential-worker':
    case 'healthcare-provider':
    case 'educator':
    case 'small-business-owner':
    case 'patient-family-member':
      return `url("/img/categories/${category}.jpg")`
    case 'other':
    default:
      return 'url("/img/categories/other.jpg")'
  }
}

export function storyName({ displayName }) {
  return displayName || 'Anonymous'
}

export function storyCite(story) {
  const { displayName, postal } = story
  return displayName ? `${displayName} from ${postal}` : `${storyCategory(story)} from ${postal}`
}

export function storyDate({ createdAt }) {
  return new Date(createdAt).toDateString()
}

export function storyParagraphs({ content }) {
  return content.split('\n').filter((p) => p)
}

import { Story } from '@prisma/client'
import useTranslation from 'next-translate/useTranslation'

export const categories = Object.freeze([
  'concerned-citizen',
  'essential-worker',
  'healthcare-provider',
  'educator',
  'small-business-owner',
  'patient-family-member',
])

export function useLabels() {
  const { t } = useTranslation('story')

  return {
    storyCategory: ({ category }: Story) =>
      t(`categories.${categories.includes(category) ? category : 'other'}`),
    storyCite: ({ displayName: name, postal: location }: Story) =>
      t(name ? 'cite.named' : 'cite.anonymous', { name, location }),
    storyName: ({ displayName }: Story): string => displayName || t('anonymous'),
  }
}

export function storyImage({ category }: Story): string {
  return `/img/categories/${categories.includes(category) ? category : 'other'}.jpg`
}

export function storyDate({ createdAt }: Story): string {
  return new Date(createdAt).toDateString()
}

export function storyParagraphs({ content }: Story): string[] {
  return content.split('\n').filter((p) => p)
}

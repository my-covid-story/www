import { Story } from '@prisma/client'
import { storyCite } from '../components/stories/model'

export default function generateSocial(story: Story, contentSize = 150, citeSize = 60): string {
  const { content } = story
  const cite = storyCite(story).slice(0, citeSize)

  if (content.length < contentSize) {
    return `"${content}" ${cite}`
  }
  const storySnippet = content.slice(0, contentSize)

  // Trim the story to the last space
  const trimmedStorySnippet = storySnippet.substring(
    0,
    Math.min(storySnippet.length, storySnippet.lastIndexOf(' '))
  )

  return `"${trimmedStorySnippet}..." ${storyCite(story).slice(0, citeSize)}`
}

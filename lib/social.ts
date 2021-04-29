import { Story } from '@prisma/client'
import { storyCite } from '../components/stories/model'

export default function generateSocial(story: Story, contentSize = 150, citeSize = 60): string {
  const storySnippet = story.content.slice(0, contentSize)
  // Generate a trimmed substring of the story snippet that we're sharing and insert
  // `...` instead of the last three characters.
  const trimmedStorySnippet = `${storySnippet.substring(0, storySnippet.length - 3)}...`

  return `"${trimmedStorySnippet}" ${storyCite(story).slice(0, citeSize)}`
}

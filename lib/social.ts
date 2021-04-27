import { Story } from '@prisma/client'
import { storyCite } from '../components/stories/model'

export default function generateSocial(story: Story, contentSize = 150) {
  return `"${story.content.slice(0, contentSize)}" by ${storyCite(story)}`
}

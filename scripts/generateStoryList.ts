import { listAllIds } from '../lib/api/stories'
import fs from 'fs'

async function generateStoryList() {
  const stories = await listAllIds()
  const mapped = stories.map((s) => s.id)
  await fs.writeFileSync('generated/story-ids.json', JSON.stringify(mapped, null, 2))
  console.log(`Generated list of ${mapped.length} story IDs `)
}

generateStoryList().then(() => console.log('finished'))

import { useRouter } from 'next/router'

export default function StoryPage() {
  const router = useRouter()
  const { id } = router.query

  return <p>Story {id}</p>
}

import { GetServerSidePropsContext } from 'next'
import { getSession, useSession } from 'next-auth/client'
import { Stack } from '@chakra-ui/react'
import prisma from '../../lib/prisma'
import { ADMIN_INCLUDE, AdminStory } from '../../lib/model/story'
import AdminLayout from '../../layouts/Admin'
import HeadTags from '../../components/common/HeadTags'
import ContentBox from '../../components/common/ContentBox'
import StoryCard from '../../components/admin/StoryCard'

interface AdminPageProps {
  stories: AdminStory[] | []
  filtered: boolean
}

function AdminPage({ stories, filtered }: AdminPageProps) {
  const [session] = useSession()

  return (
    <>
      <HeadTags>
        <meta name="robots" content="noindex" />
      </HeadTags>
      <ContentBox pb={2}>
        <Stack spacing={8}>
          {session && (
            <>
              {stories.map((story) => (
                <StoryCard key={story.id} story={story} filteredView={filtered} />
              ))}
            </>
          )}
        </Stack>
      </ContentBox>
    </>
  )
}

AdminPage.setLayout = AdminLayout
export default AdminPage

export async function getServerSideProps({ req, query }: GetServerSidePropsContext) {
  const session = await getSession({ req })

  const deleted = query.deleted === 'true'
  const approved = query.approved === 'true'

  let stories = []
  if (session) {
    stories = await prisma.story.findMany({
      where: {
        approved,
        deleted,
      },
      orderBy: { createdAt: 'asc' },
      include: ADMIN_INCLUDE,
    })
  }

  return {
    props: { stories, filtered: deleted || approved },
  }
}

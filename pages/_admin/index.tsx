import { Stack } from '@chakra-ui/react'
import { getSession, useSession } from 'next-auth/client'
import HeadTags from '../../components/common/HeadTags'

import prisma from '../../lib/prisma'
import { ADMIN_INCLUDE, AdminStory } from '../../lib/model/story'
import ContentBox from '../../components/common/ContentBox'
import { GetServerSidePropsContext } from 'next'
import AdminLayout from '../../layouts/Admin'
import StoryCard from '../../components/admin/StoryCard'

interface _Admin {
  stories: AdminStory[] | []
  filtered: boolean
}

const _Admin = ({ stories, filtered }: _Admin) => {
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

_Admin.setLayout = AdminLayout
export default _Admin

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

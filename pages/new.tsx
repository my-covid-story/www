import { Box, Button, Heading, SimpleGrid, useBoolean } from '@chakra-ui/react'
import ContentBox from '../components/common/ContentBox'
import HeadTags from '../components/common/HeadTags'
import SimpleLink from '../components/common/SimpleLink'

function Header() {
  return (
    <Box
      bgImage="url('/img/landingpage-v2.jpg')"
      bgSize="cover"
      bgPosition="center 55%"
      color="white"
    >
      <Box bg="rgba(0, 0, 0, 0.5)">
        <ContentBox pt={[8, null, 14]} pb={[10, null, 32]} />
      </Box>
    </Box>
  )
}

interface CardProps {
  card: {
    href: string
    imgURL: string
    text: string
  }
}

function Card({ card }: CardProps) {
  const [hover, setHover] = useBoolean()

  return (
    <SimpleLink
      href={`${card.href}`}
      undecorated
      textAlign="center"
      onMouseEnter={setHover.on}
      onMouseLeave={setHover.off}
    >
      <Box as="article">
        <Box
          borderRadius="8px"
          bgImage={`url(${card.imgURL})`}
          bgSize="cover"
          bgPosition="center"
          color="white"
        >
          <Box p={[4, null, null, 6]} borderRadius="8px" bg="rgba(0, 0, 0, 0.5)">
            <Box
              minH="6em"
              my={[4, null, null, 6]}
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <Heading as="h3" fontSize="2xl" fontWeight={600}>
                {card.text}
              </Heading>
            </Box>
          </Box>
        </Box>
      </Box>
      <Button bg={hover ? 'brand.500' : 'brand.100'} mt={3} color="white">
        {card.text}
      </Button>
    </SimpleLink>
  )
}

const cards = [
  {
    href: 'report-a-child-case',
    imgURL: '/img/categories/educator.jpg',
    text: 'Report a Child Case',
  },
  {
    href: 'add-a-story',
    imgURL: '/img/categories/concerned-citizen.jpg',
    text: 'Add a New Story',
  },
]

export default function NewStoryStep() {
  return (
    <>
      <HeadTags
        title="Post your story"
        description="Share your story of how COVID-19 has impacted you. If our leaders won't listen to the numbers, they must face our stories"
      />
      <Box>
        <Header />
        <ContentBox>
          <SimpleGrid
            as="main"
            columns={[1, null, 2]}
            spacingY={[6, null, 8]}
            spacingX={[6, null, 10, 16]}
          >
            {cards.map((card) => (
              <Card key={card.href} card={card} />
            ))}
          </SimpleGrid>
        </ContentBox>
      </Box>
    </>
  )
}

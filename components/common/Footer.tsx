import { Box, Container, SimpleGrid, Text } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import MenuItem from './MenuItem'
import VercelSVG from '../icons/VercelSVG'

export default function Footer() {
  const { t } = useTranslation('common')
  return (
    <Box
      as="footer"
      backgroundColor="#202020"
      color="#FFF"
      paddingTop={10}
      paddingBottom={8}
      textAlign="left"
    >
      <Container centerContent maxW="container.sm">
        <SimpleGrid columns={[2, 3]} width="100%" textAlign={['left', 'center']}>
          <MenuItem padding={1} marginBottom={1}>
            {t('home')}
          </MenuItem>
          <MenuItem to="/about" padding={1} marginBottom={1}>
            {t('about')}
          </MenuItem>
          <MenuItem to="/faq" padding={1} marginBottom={1}>
            {t('faq')}
          </MenuItem>
          <MenuItem
            to="https://kvmhxg5ojy6.typeform.com/to/gUsoYkft"
            externalLink={true}
            padding={1}
            marginBottom={1}
          >
            {t('media')}
          </MenuItem>
          {/*<MenuItem padding={1} marginBottom={1}>Releases</MenuItem>*/}
          <MenuItem
            to="https://github.com/my-covid-story/www"
            externalLink={true}
            padding={1}
            marginBottom={1}
          >
            Github
          </MenuItem>
          <MenuItem
            to="https://app.usefathom.com/share/xnknpyhv/mycovidstory.ca"
            externalLink={true}
            padding={1}
            marginBottom={1}
          >
            {t('analytics')}
          </MenuItem>
          <MenuItem to="mailto:info@mycovidstory.ca" padding={1} marginBottom={1}>
            {t('email')}
          </MenuItem>
          <MenuItem
            to="mailto:info@mycovidstory.ca?subject=I'd like to help translate!"
            padding={1}
            marginBottom={1}
          >
            {t('translate')}
          </MenuItem>
        </SimpleGrid>
        <Text as="strong" paddingTop={4} mb={4}>
          {t('made_with')}
        </Text>
        <MenuItem
          to="https://vercel.com?utm_source=my-covid-story&utm_campaign=oss"
          externalLink={true}
        >
          <VercelSVG />
        </MenuItem>
      </Container>
    </Box>
  )
}

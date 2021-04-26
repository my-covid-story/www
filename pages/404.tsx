import { Flex, Heading, Text } from '@chakra-ui/react'
import FlexBreak from '../components/common/FlexBreak'
import SimpleLink from '../components/common/SimpleLink'

interface ErrorPageProps {
  code: number
  message: string
}

/**
 * A reusable error page: it automatically handles Next errors, but it can also be used with a custom status code and message.
 * @param code the status code referred to the error, defaults to `404` for Next automatic error handling.
 * @param message the message to display with the error, defaults to "Not found" for Next automatic error handling.
 */
export default function ErrorPage({
  code = 404,
  message = 'Not found',
}: ErrorPageProps): JSX.Element {
  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" height="100%">
      <Flex flexWrap="wrap" justifyContent="center">
        <Heading>Ooops... there was an error!</Heading>

        <FlexBreak></FlexBreak>

        <Text>
          Status code: <code>{code}</code>, message: &quot;{message}&quot;
        </Text>

        <FlexBreak></FlexBreak>

        <Text>
          You should go back to the{' '}
          <SimpleLink href="/" fontWeight="500">
            homepage
          </SimpleLink>
          !
        </Text>
      </Flex>
    </Flex>
  )
}

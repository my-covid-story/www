import { Flex, Heading, Text } from '@chakra-ui/react'
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
    <Flex justifyContent="center" alignItems="center" height="100%" flexDirection="column">
      <Heading>Ooops... there was an error!</Heading>

      <Text>
        Status code: <code>{code}</code>, message: &quot;{message}&quot;
      </Text>

      <Text>
        You should go back to the{' '}
        <SimpleLink href="/" fontWeight="600">
          homepage
        </SimpleLink>
        !
      </Text>
    </Flex>
  )
}

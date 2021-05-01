import { Flex, Heading } from '@chakra-ui/react'
import SimpleLink from '../components/common/SimpleLink'

interface ErrorPageProps {
  message?: string
}

/**
 * A reusable error page: it automatically handles Next errors, but it can also be used with a custom status code and message.
 * @param message the message to display with the error, defaults to "Ooops. Can't find it." for Next automatic error handling.
 */
export default function ErrorPage({
  message = "Ooops. Can't find it.",
}: ErrorPageProps): JSX.Element {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100%"
      flexDirection="column"
      paddingTop="100px"
      paddingBottom="100px"
    >
      <Heading>{message}</Heading>

      <img
        src="/svg/error-page.svg"
        alt="Error illustration"
        style={{ width: '75%', maxWidth: '450px', marginTop: '50px', marginBottom: '50px' }}
      />

      <SimpleLink href="/" fontWeight="600" color="primary.100">
        Return to home
      </SimpleLink>
    </Flex>
  )
}

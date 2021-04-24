import { Link, Text } from '@chakra-ui/react'

export default function MenuItem({ children, to = '/', externalLink = false, ...rest }) {
  return (
    <Link href={to} isExternal={externalLink}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  )
}

import { Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function MenuItem({ children, to = '/', externalLink = false, ...rest }) {
  return (
    <NextLink href={to} passHref>
      <Link href={to} isExternal={externalLink}>
        <Text display="block" {...rest}>
          {children}
        </Text>
      </Link>
    </NextLink>
  )
}

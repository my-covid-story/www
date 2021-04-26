import { ReactElement, ReactNode } from 'react'
import { Link, Text } from '@chakra-ui/react'

export default function MenuItem({
  children,
  to = '/',
  externalLink = false,
  ...props
}: {
  children: ReactNode
  to?: string
  externalLink?: boolean
  [x: string]: unknown
}): ReactElement {
  return (
    <Link href={to} isExternal={externalLink}>
      <Text display="block" {...props}>
        {children}
      </Text>
    </Link>
  )
}

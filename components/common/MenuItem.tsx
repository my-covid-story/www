import { Link, Text, TextProps } from '@chakra-ui/react'

interface MenuItemProps extends TextProps {
  to?: string
  externalLink?: boolean
}

export default function MenuItem({
  children,
  to = '/',
  externalLink = false,
  ...props
}: MenuItemProps) {
  return (
    <Link href={to} isExternal={externalLink}>
      <Text display="block" {...props}>
        {children}
      </Text>
    </Link>
  )
}

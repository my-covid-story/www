import { Link, LinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'

// Add `to` prop to make it work with already existing links
interface ExtendedMenuItemProps extends LinkProps {
  to?: string
  externalLink?: boolean
}

// Omit the `href` and the `isExternal` prop to avoid duplication with the to prop
type MenuItemProps = Omit<ExtendedMenuItemProps, 'href'>

export default function MenuItem({
  to = '/',
  externalLink = false,
  children,
  ...props
}: MenuItemProps) {
  return (
    <NextLink href={to} passHref>
      <Link isExternal={externalLink} {...props}>
        {children}
      </Link>
    </NextLink>
  )
}

import { LinkProps, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

interface SimpleLinkProps extends LinkProps {
  href: string
  asHref?: string
  undecorated?: boolean
}

/**
 * A simple link which wraps a Chakra UI `Link` (for appearance) a NextJS `Link` (for function)
 * @param props passed directly to the Chakra `Link` except...
 * @param props.href the path to navigate to (passed to the Next `Link`)
 * @param props.asHref an optional decorator for the path (passed to the Next `Link`'s `as` prop)
 * @param props.undecorated true if any text decoration should be suppressed
 * @param props.children the content to be projected inside the link
 * @example <SimpleLink href="/about">About us</SimpleLink>
 */
export default function SimpleLink({ href, asHref, undecorated, ...props }: SimpleLinkProps) {
  if (undecorated === true) {
    props = { textDecoration: 'none', _hover: { textDecoration: 'none' }, ...props }
  }

  return (
    // We need passHref in order to make the anchor tag work properly. See
    // https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag
    <NextLink href={href} as={asHref} passHref>
      <Link {...props} />
    </NextLink>
  )
}

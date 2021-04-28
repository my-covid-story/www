import { LinkProps, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

interface SimpleLinkProps extends LinkProps {
  href: string
}

/**
 * A simple link which wraps Chakra UI's link with the NextJS `Link` component.
 * @param href the destination of the link. Needs to be in the same format as the Next's link's `href` prop.
 * @param children the text to be projected inside the link.
 * @example <SimpleLink href="/about">About us</SimpleLink>
 */
export default function SimpleLink({ href, children, ...props }: SimpleLinkProps): JSX.Element {
  return (
    /**
     * We need passHref in order to make the anchor tag work properly.
     * @see https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag
     */
    <NextLink href={href} passHref>
      <Link {...props}>{children}</Link>
    </NextLink>
  )
}

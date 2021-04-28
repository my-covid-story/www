import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

import { signIn, signOut } from 'next-auth/client'
import ContentBox from '../common/ContentBox'
import { Session } from 'next-auth'

const Links = [
  { href: '/_admin/', text: 'Admin Homepage' },
  { href: '/_admin/?approved=true', text: 'Show Approved' },
  { href: '/_admin/?deleted=true', text: 'Show Deleted' },
]

interface NavLinkProps {
  href: string
  text: string
}

const NavLink = ({ href, text }: NavLinkProps) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}
  >
    {text}
  </Link>
)

interface NavProps {
  session: Session
}

export default function Nav({ session }: NavProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        {!session && (
          <ContentBox height="100%" display="flex" alignItems="center" justifyContent="center">
            <Link spacing={8} onClick={() => signIn()}>
              Sign in
            </Link>
          </ContentBox>
        )}
        {session && (
          <>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
              <IconButton
                size={'md'}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={'Open Menu'}
                display={{ md: !isOpen ? 'none' : 'inherit' }}
                onClick={isOpen ? onClose : onOpen}
              />
              <HStack spacing={8} alignItems={'center'}>
                <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                  {Links.map((link) => (
                    <NavLink key={link.text} href={link.href} text={link.text} />
                  ))}
                </HStack>
              </HStack>
              <Flex alignItems={'center'}>
                <NavLink key={session.user.email} href="#" text={session.user.email} />
                <button onClick={() => signOut()}>Sign out</button>
              </Flex>
            </Flex>

            {isOpen ? (
              <Box pb={4}>
                <Stack as={'nav'} spacing={4}>
                  {Links.map((link) => (
                    <NavLink key={link.text} href={link.href} text={link.text} />
                  ))}
                </Stack>
              </Box>
            ) : null}
          </>
        )}
      </Box>
    </>
  )
}

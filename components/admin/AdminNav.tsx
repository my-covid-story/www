import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  LinkProps,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

import { signIn, signOut, useSession } from 'next-auth/react'
import { RESPONSIVE_PADDING } from '../common/ContentBox'

const Links = [
  { href: '/_admin/', text: 'Admin Homepage' },
  { href: '/_admin/?approved=true', text: 'Show Approved' },
  { href: '/_admin/?deleted=true', text: 'Show Deleted' },
]

interface LinkDisplayProps extends LinkProps {
  href?: string
  text: string
}

const LinkDisplay = ({ href = '#', text, ...props }: LinkDisplayProps) => {
  const bgColor = useColorModeValue('gray.300', 'gray.700')
  return (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      bgColor={'gray.200'}
      _hover={{
        textDecoration: 'none',
        bg: bgColor,
      }}
      href={href}
      {...props}
    >
      {text}
    </Link>
  )
}

interface NavLinkProps extends LinkDisplayProps {
  alwaysDisplay?: boolean
}

const NavLink = ({ alwaysDisplay = false, ...props }: NavLinkProps) => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  if (alwaysDisplay) {
    return <LinkDisplay {...props} />
  }

  // Checking the session for null based on https://stackoverflow.com/a/63191786
  if (loading && session !== null) {
    return <Skeleton height="20px" width="5vw" minWidth="30px" />
  }

  if (!loading && !session) {
    return <></>
  }

  return <LinkDisplay {...props} />
}

export default function AdminNav() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: session } = useSession()

  return (
    <>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        py={4}
        px={RESPONSIVE_PADDING}
        position={'sticky'}
        top={0}
        zIndex={1}
      >
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={
              isOpen ? (
                <CloseIcon color={'white'} />
              ) : (
                <HamburgerIcon color={'white'} />
              )
            }
            aria-label={'Open Menu'}
            display={{ lg: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', lg: 'flex' }}
            >
              {Links.map((link) => (
                <NavLink key={link.text} href={link.href} text={link.text} />
              ))}
            </HStack>
          </HStack>
          <Flex
            spacing={4}
            alignItems={{ base: 'flex-end', sm: 'center' }}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Text
              mb={{ base: 1, sm: 0 }}
              mr={{ sm: 4 }}
              fontSize={{ base: '0.75rem', sm: 'md' }}
            >
              {session?.user.email ?? ''}
            </Text>
            <NavLink
              onClick={session ? () => signOut() : () => signIn()}
              text={session ? 'Sign out' : 'Sign in'}
              alwaysDisplay={true}
            />
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pt={4} display={{ lg: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.text} href={link.href} text={link.text} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}

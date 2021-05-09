import { MutableRefObject, useEffect, useRef } from 'react'
import Router from 'next/router'
import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Stack,
  VisuallyHidden,
  useDisclosure,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import SimpleLink from './SimpleLink'
import { RESPONSIVE_PADDING } from './ContentBox'
import FacebookSVG from '../icons/FacebookSVG'
import InstagramSVG from '../icons/InstagramSVG'
import TwitterSVG from '../icons/TwitterSVG'

const MenuIcon = () => (
  <svg width="16px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="white">
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
)

interface MenuButtonProps {
  isOpen: boolean
  buttonRef?: MutableRefObject<HTMLButtonElement>
  onClick: () => void
}

const MenuButton = ({ isOpen, buttonRef, onClick }: MenuButtonProps) => {
  return (
    <IconButton
      ref={buttonRef}
      m={-2}
      py={2}
      variant="link"
      colorScheme="white"
      aria-label={isOpen ? 'Close menu' : 'Menu'}
      icon={isOpen ? <CloseIcon /> : <MenuIcon />}
      onClick={onClick}
    />
  )
}

interface MenuDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const MenuDrawer = ({ isOpen, onClose }: MenuDrawerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <Drawer placement="top" initialFocusRef={buttonRef} isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent
        pt={4}
        pb={6}
        px={RESPONSIVE_PADDING}
        bg="primary.100"
        bgGradient="linear(to-b, primary.100, primary.500)"
      >
        <Box position="relative" color="white" fontSize="lg" fontWeight="bold">
          <Stack direction="column" align="flex-start" spacing={6}>
            <NavLinks menu />
          </Stack>
          <Box position="absolute" top={0} right={0}>
            <MenuButton buttonRef={buttonRef} isOpen={true} onClick={onClose} />
          </Box>
        </Box>
      </DrawerContent>
    </Drawer>
  )
}

const Logo = () => {
  return (
    <SimpleLink href="/" undecorated fontWeight="bold">
      My COVID Story
    </SimpleLink>
  )
}

const NavLinks = ({ menu = false }) => {
  return (
    <>
      <SimpleLink href="/">Home</SimpleLink>
      <SimpleLink href="/about">About Us</SimpleLink>
      <SimpleLink href="/faq">FAQ</SimpleLink>
      <SimpleLink href="https://kvmhxg5ojy6.typeform.com/to/gUsoYkft" isExternal>
        Media
      </SimpleLink>

      {/* The Box is required to take the spacing margin, allowing the Stack inside to have negative margin. */}
      <Box>
        <Stack
          direction="row"
          spacing={menu ? 6 : [4, null, null, 8]}
          my={menu ? 1 : -1}
          mx={-1}
          fontSize={menu ? '2xl' : 'md'}
        >
          <SimpleLink href="https://twitter.com/MyCOVIDStory_CA" isExternal p={1}>
            <TwitterSVG />
            <VisuallyHidden>Twitter @MyCOVIDStory_CA</VisuallyHidden>
          </SimpleLink>
          <SimpleLink href="https://www.facebook.com/MyCovidStoryCA" isExternal p={1}>
            <FacebookSVG />
            <VisuallyHidden>Facebook @MyCovidStoryCA</VisuallyHidden>
          </SimpleLink>
          <SimpleLink href="https://www.instagram.com/mycovidstory_ca/" isExternal p={1}>
            <InstagramSVG />
            <VisuallyHidden>Instagram @mycovidstory_ca</VisuallyHidden>
          </SimpleLink>
        </Stack>
      </Box>

      <SimpleLink href="/new">
        <Button
          display="block"
          tabIndex={-1}
          size={menu ? 'md' : 'sm'}
          rounded="md"
          color="primary.100"
          bg="white"
          _hover={{ bg: ['white'] }}
        >
          Add Your Story
        </Button>
      </SimpleLink>
    </>
  )
}

interface NavProps {
  sticky?: boolean
}

export default function Nav({ sticky = false }: NavProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    Router.events.on('routeChangeComplete', onClose)
    return () => Router.events.off('routeChangeComplete', onClose)
  }, [onClose])

  return (
    <>
      <Flex
        as="nav"
        position={sticky ? 'sticky' : 'static'}
        top={0}
        left={0}
        right={0}
        wrap="wrap"
        justify="space-between"
        align="center"
        py={4}
        px={RESPONSIVE_PADDING}
        bg="primary.100"
        bgGradient="linear(to-r, primary.100, primary.700)"
        color="white"
      >
        <Logo />
        <Stack
          display={['none', null, 'flex']}
          direction="row"
          align="center"
          // Less spacing below lg to avoid wrapping the nav bar as it gets smaller.
          spacing={[6, null, null, 8]}
          // The negative margin lets the button to extend beyond the box, avoiding making the nav bar taller.
          my={-1}
        >
          <NavLinks />
        </Stack>
        <Box display={['block', null, 'none']}>
          <MenuButton isOpen={false} onClick={onOpen} />
        </Box>
      </Flex>
      <MenuDrawer isOpen={isOpen} onClose={onClose} />
    </>
  )
}

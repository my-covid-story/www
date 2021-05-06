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
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import Logo from './Logo'
import MenuItem from './MenuItem'
import { RESPONSIVE_PADDING } from './ContentBox'
import FacebookSVG from '../icons/FacebookSVG'
import InstagramSVG from '../icons/InstagramSVG'
import TwitterSVG from '../icons/TwitterSVG'

const colorProps = {
  bg: 'primary.100',
  bgGradient: 'linear(to-r, primary.100, primary.700)',
  color: 'white',
}

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
      <DrawerContent {...colorProps}>
        <NavBar>
          <Logo />
          <MenuButton buttonRef={buttonRef} isOpen={true} onClick={onClose} />
        </NavBar>
        <NavLinks />
      </DrawerContent>
    </Drawer>
  )
}

const NavLinks = () => {
  return (
    <Stack
      direction={['column', null, 'row']}
      align="center"
      spacing={[6, null, null, 8]}
      // The negative margin lets the button to extend beyond the box, avoiding making the nav bar taller.
      my={[0, null, -1]}
      py={[6, null, 0]}
      px={[4, null, 0]}
    >
      <MenuItem to="/">Home</MenuItem>
      <MenuItem to="/about">About Us</MenuItem>
      <MenuItem to="/faq">FAQ</MenuItem>
      <MenuItem to="https://kvmhxg5ojy6.typeform.com/to/gUsoYkft" externalLink={true}>
        Media
      </MenuItem>

      {/* The Box is required to take the spacing margin, allowing the Stack inside to have negative margin. */}
      <Box>
        <Stack direction="row" spacing={[4, null, null, 6]} m={-1}>
          <MenuItem to="https://twitter.com/MyCOVIDStory_CA" externalLink={true} p={1}>
            <TwitterSVG />
            <VisuallyHidden>Twitter @MyCOVIDStory_CA</VisuallyHidden>
          </MenuItem>
          <MenuItem to="https://www.facebook.com/MyCovidStoryCA" externalLink={true} p={1}>
            <FacebookSVG />
            <VisuallyHidden>Facebook @MyCovidStoryCA</VisuallyHidden>
          </MenuItem>
          <MenuItem to="https://www.instagram.com/mycovidstory_ca/" externalLink={true} p={1}>
            <InstagramSVG />
            <VisuallyHidden>Instagram @mycovidstory_ca</VisuallyHidden>
          </MenuItem>
        </Stack>
      </Box>

      <MenuItem to="/new">
        <Button
          display="block"
          tabIndex={-1}
          size="sm"
          rounded="md"
          color="primary.100"
          bg="white"
          _hover={{ bg: ['white'] }}
        >
          Add Your Story
        </Button>
      </MenuItem>
    </Stack>
  )
}

const NavBar = ({ sticky = false, children }) => {
  return (
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
      {...colorProps}
    >
      {children}
    </Flex>
  )
}

interface NavProps {
  sticky: boolean
}

export default function Nav({ sticky = false }: NavProps) {
  const menu = useBreakpointValue([true, null, false])
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    Router.events.on('routeChangeComplete', onClose)
    return () => Router.events.off('routeChangeComplete', onClose)
  }, [onClose])

  return (
    <>
      <NavBar sticky={sticky}>
        <Logo />
        {!menu && <NavLinks />}
        {menu && <MenuButton isOpen={false} onClick={onOpen} />}
      </NavBar>
      <MenuDrawer isOpen={isOpen} onClose={onClose} />
    </>
  )
}

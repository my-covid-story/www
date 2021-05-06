import { MouseEventHandler, useState, useEffect } from 'react'
import Router from 'next/router'
import {
  Box,
  Button,
  Flex,
  FlexProps,
  IconButton,
  PositionProps,
  Stack,
  VisuallyHidden,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import Logo from './Logo'
import MenuItem from './MenuItem'
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

interface MenuToggleProps {
  toggle: MouseEventHandler
  isOpen: boolean
}

const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
  return (
    <Box display={['block', null, 'none']} m={-2} onClick={toggle}>
      <IconButton
        py={2}
        variant="link"
        colorScheme="white"
        aria-label={isOpen ? 'Close menu' : 'Menu'}
        icon={isOpen ? <CloseIcon /> : <MenuIcon />}
      />
    </Box>
  )
}

interface MenuLinksProps {
  isOpen?: boolean
}

const MenuLinks = ({ isOpen }: MenuLinksProps) => {
  return (
    <Box
      display={[isOpen ? 'block' : 'none', null, 'block']}
      flexBasis={['100%', null, 'auto']}
      mt={[0, null, -1]}
      mb={[0, null, -1]}
      p={[4, null, 0]}
      pt={[8, null, 0]}
      bg={['primary.100', null, 'none']}
      bgGradient={['linear(to-r, primary.100, primary.700)', null, 'none']}
    >
      <Stack spacing={[6, null, null, 8]} align="center" direction={['column', null, 'row']}>
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
    </Box>
  )
}

const NavContainer = ({ children, ...props }: FlexProps) => {
  return (
    <Flex
      as="nav"
      top="0"
      w="100%"
      align="center"
      justify="space-between"
      wrap="wrap"
      zIndex="5"
      py={4}
      px={RESPONSIVE_PADDING}
      bg="primary.100"
      bgGradient="linear(to-r, primary.100, primary.700)"
      color="white"
      {...props}
    >
      {children}
    </Flex>
  )
}

export default function Nav({ ...props }: FlexProps & PositionProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = (): void => setIsOpen(!isOpen)

  useEffect(() => {
    const closePanel = () => setIsOpen(false)
    Router.events.on('routeChangeComplete', closePanel)
    return () => Router.events.off('routeChangeComplete', closePanel)
  }, [])

  return (
    <NavContainer {...props}>
      <Logo />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavContainer>
  )
}

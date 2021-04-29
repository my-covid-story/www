import { MouseEventHandler, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  FlexProps,
  PositionProps,
  Stack,
  VisuallyHidden,
} from '@chakra-ui/react'
import Logo from './Logo'
import MenuItem from './MenuItem'
import { RESPONSIVE_PADDING } from './ContentBox'
import FacebookSVG from '../icons/FacebookSVG'
import InstagramSVG from '../icons/InstagramSVG'
import TwitterSVG from '../icons/TwitterSVG'

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
)

const MenuIcon = () => (
  <svg width="24px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="white">
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
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  )
}

interface MenuLinksProps {
  isOpen?: boolean
}

const MenuLinks = ({ isOpen }: MenuLinksProps) => {
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'column', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/about">About Us</MenuItem>
        <MenuItem to="/faq">FAQ</MenuItem>
        <MenuItem to="https://kvmhxg5ojy6.typeform.com/to/gUsoYkft" externalLink={true}>
          Media
        </MenuItem>

        {/* Icons */}
        <MenuItem to="https://twitter.com/MyCOVIDStory_CA" externalLink={true}>
          <TwitterSVG />
          <VisuallyHidden>Twitter @MyCOVIDStory_CA</VisuallyHidden>
        </MenuItem>
        <MenuItem to="https://www.facebook.com/MyCovidStoryCA" externalLink={true}>
          <FacebookSVG />
          <VisuallyHidden>Facebook @MyCovidStoryCA</VisuallyHidden>
        </MenuItem>
        <MenuItem to="https://www.instagram.com/mycovidstory_ca/" externalLink={true}>
          <InstagramSVG />
          <VisuallyHidden>Instagram @mycovidstory_ca</VisuallyHidden>
        </MenuItem>

        <MenuItem to="/new">
          <Button
            size="sm"
            my={isOpen ? 0 : -1}
            rounded="md"
            color="primary.100"
            bg="white"
            _hover={{
              bg: ['white'],
            }}
          >
            Add Your Story
          </Button>
        </MenuItem>
      </Stack>
    </Box>
  )
}

const NavBarContainer = ({ children, ...props }: FlexProps) => {
  return (
    <Flex
      zIndex="5"
      top="0"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
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

  return (
    <NavBarContainer {...props}>
      <Logo w="150px" color={['white', 'white', 'primary.500', 'primary.500']} />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  )
}

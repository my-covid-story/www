import { Button as BaseButton, ButtonProps, Center, CenterProps } from '@chakra-ui/react'
import { RESPONSIVE_PADDING } from './ContentBox'

export default function FloatingRibbon({ children }: CenterProps) {
  return (
    <Center
      pos="sticky"
      bottom={0}
      left={0}
      right={0}
      py={4}
      px={RESPONSIVE_PADDING}
      borderTopRadius="8px"
      boxShadow="0px -4px 4px rgba(0, 0, 0, 0.1)"
      bg="white"
    >
      {children}
    </Center>
  )
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <BaseButton
      py={2}
      px={8}
      bg="#55099D"
      color="white"
      borderRadius="4px"
      fontWeight={600}
      {...props}
    >
      {children}
    </BaseButton>
  )
}

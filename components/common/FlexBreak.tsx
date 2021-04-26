import { chakra } from '@chakra-ui/react'

/**
 * A break component which can be reused in any flex container with `flex-wrap` set to
 * `wrap` to force a new line.
 */
export default function FlexBreak(): JSX.Element {
  return <chakra.div flexBasis="100%"></chakra.div>
}

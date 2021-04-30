import { CSSProperties, ReactNode } from 'react'

interface CustomShareContainerProps {
  children?: ReactNode
  style?: CSSProperties
  onClick?: () => void
}

const defaultStyling: CSSProperties = {
  height: '64px',
  width: '64px',
  backgroundColor: '#7E7E7F',
  cursor: 'pointer',
}

export default function CustomShareContainer({
  children,
  style,
  onClick,
}: CustomShareContainerProps) {
  return (
    <button style={{ ...defaultStyling, ...style }} onClick={onClick} aria-label="share">
      {children}
    </button>
  )
}

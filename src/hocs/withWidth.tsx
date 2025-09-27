import { useEffect, useState, type ComponentType } from "react"

const withWidth = (WrappedComponent: ComponentType<any>) => {
  const [width, setWidth] = useState(window.innerWidth)

  const handleResize = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', () => handleResize)
    }
  }, [])

  return (props: any) => {
    return (
      <WrappedComponent
        {...props}
        width={width}
      />
    )
  }
}

export default withWidth
import { type ComponentType } from "react"

const withEnhancement = (WrappedComponent: ComponentType<any>) => {
  return (props: any) => {
    console.log('withEnhancement props', props)

    return (
      <WrappedComponent
        test='1'
        {...props}
      />
    )
  }
}

export default withEnhancement
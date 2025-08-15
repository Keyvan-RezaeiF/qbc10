interface MainProps {
  children?: React.ReactNode;
}

const Main = (props: MainProps) => {
  const { children } = props

  return (
    <div className="main">
      {children}
    </div>
  )
}

export default Main
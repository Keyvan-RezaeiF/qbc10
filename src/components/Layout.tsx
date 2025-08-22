interface LayoutProps {
  children: React.ReactNode
  hasFooter?: boolean
}

const Layout = (props: LayoutProps) => {
  const {
    children,
    hasFooter = true
  } = props

  return (
    <div style={{  display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
      <nav style={{ position: 'absolute', top: 0 }}>Navbar</nav>
      {children}
      {hasFooter && (
        <footer style={{ position: 'absolute', bottom: 0 }}>
          Footer
        </footer>
      )}
    </div>
  )
}

export default Layout
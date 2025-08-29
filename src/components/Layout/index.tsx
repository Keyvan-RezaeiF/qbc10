import classes from './styles.module.css'

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
    <div className={classes.layout}>
      <nav className={classes.nav}>Navbar</nav>
      {children}
      {hasFooter && (
        <footer className={classes.footer}>
          Footer
        </footer>
      )}
    </div>
  )
}

export default Layout
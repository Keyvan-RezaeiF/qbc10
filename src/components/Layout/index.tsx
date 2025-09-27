import classes from './styles.module.css'

interface LayoutProps {
  children: React.ReactNode
  hasFooter?: boolean
  width?: number
}

const Layout = (props: LayoutProps) => {
  const {
    children,
    hasFooter = true,
    width = window.innerWidth
  } = props

  console.log('width', width)

  return (
    <div className={classes.layout}>
      {width >= 800 ? (
        <nav className={classes.nav}>Navbar</nav>
      ): (
        <nav className={classes.nav}>dropdown</nav>
      )}
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
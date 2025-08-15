import Logo from "./Logo";

interface NavbarProps {
  children?: React.ReactNode;
}

const Navbar = (props: NavbarProps) => {
  const { children } = props

  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  )
}

export default Navbar
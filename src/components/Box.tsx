import { useState } from "react";

interface BoxProps {
  children?: React.ReactNode;
}

const Box = (props: BoxProps) => {
  const { children } = props
  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen(prev => !prev)}
      >
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  )
}

export default Box
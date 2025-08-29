import { createUseStyles } from "react-jss"

const styles = {
  disabledButton: {
    opacity: 0.2
  },
  button: {
    backgroundColor: 'green',
    width: 24,
    height: 24,
  },
  count: {
    // margin: '0 8px',
    margin: [0, 8]
  },
}

export default createUseStyles(styles)
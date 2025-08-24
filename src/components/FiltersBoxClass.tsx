import { Component, createRef } from "react"

interface FiltersBoxState {
  showSearchBox: boolean
}

class FiltersBoxClass extends Component<{}, FiltersBoxState> {
  private inputRef: React.RefObject<HTMLInputElement | null>

  constructor(props: {}) {
    super(props)
    this.state = {
      showSearchBox: true,
    }
    this.inputRef = createRef<HTMLInputElement>()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(): void {
    if (!this.inputRef.current) return

    this.inputRef.current?.focus()
  }

  handleClick() {
    this.setState(prev => ({
      ...prev,
      showSearchBox: !prev.showSearchBox
    }))
  }

  render() {
    const { showSearchBox } = this.state

    return (
      <div>
        <button onClick={this.handleClick}>Toggle Search Box</button>
        {showSearchBox && (
          <input
            type="text"
            style={{
              display: 'block',
              marginBottom: 4,
            }}
            ref={this.inputRef}
            placeholder='Search ...'
          />
        )}
        <div>
          <input
            type="checkbox"
            name="products"
            id="products"
            style={{ marginRight: 4 }}
          />
          <label htmlFor="products">
            Only show products in stock
          </label>
        </div>
      </div>
    )
  }
}

export default FiltersBoxClass
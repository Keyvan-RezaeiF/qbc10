import { Component, useEffect, useRef, useState } from "react"

interface CounterState {
  count: number
}

class CounterClass extends Component<{}, CounterState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      count: 0,
    }
    this.handleMinus = this.handleMinus.bind(this)
    this.handlePlus = this.handlePlus.bind(this)
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<CounterState>, snapshot?: any): void {
    if (prevState.count !== this.state.count) {
      console.log('Count changed:', this.state.count)
    }
  }

  handleMinus() {
    const { count } = this.state

    if (count === 0) return

    this.setState({
      count: count - 1
    })
  }

  handlePlus() {
    this.setState(prev => ({
      count: prev.count + 1
    }))
  }

  render() {
    return (
      <div>
        <button
          style={{ width: 24, height: 24 }}
          onClick={this.handleMinus}
        >
          -
        </button>
        <span style={{ margin: '0 8px' }}>{this.state.count}</span>
        <button
          style={{ width: 24, height: 24 }}
          onClick={this.handlePlus}
        >
          +
        </button>
      </div >
    )
  }
}

export default CounterClass
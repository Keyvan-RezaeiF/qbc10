# React.memo Hook

## What is React.memo?

`React.memo` is a **higher-order component** that optimizes performance by memoizing (caching) component renders to prevent unnecessary re-renders when props haven't changed.

### What it does

`React.memo` wraps a component and only re-renders it when its props have changed. If the props are the same as the previous render, React skips the re-render and reuses the cached result.

### Basic Syntax

```typescript
import { memo } from 'react'

const MyComponent = memo(({ name, age }) => {
  console.log('MyComponent rendered') // Only logs when props change
  return (
    <div>
      <h2>{name}</h2>
      <p>{age} years old</p>
    </div>
  )
})

// Or with custom comparison
const MyComponent = memo(({ user }) => {
  return <div>{user.name}</div>
}, (prevProps, nextProps) => {
  // Custom comparison function
  return prevProps.user.name === nextProps.user.name
})
```

### How it works

1. **First render**: Component renders and result is cached
2. **Subsequent renders**:
   - If props haven't changed → returns cached result (skips re-render!)
   - If props changed → re-renders component and updates cache

### Real Example from Your Code Context

```typescript
// Without React.memo - AlertButton re-renders every time App re-renders
const AlertButton = ({ children, onClick }) => {
  console.log('AlertButton rendered') // Logs on every parent re-render
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

// With React.memo - AlertButton only re-renders when props change
const AlertButton = memo(({ children, onClick }) => {
  console.log('AlertButton rendered') // Only logs when props change
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
})

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Counter: {count}</h1>
      <AlertButton onClick={() => setCount(count + 1)}>
        Increment
      </AlertButton>
    </div>
  )
}
```

**What happens:**

- **Without React.memo**: `AlertButton` re-renders every time `count` changes (even though its props haven't changed)
- **With React.memo**: `AlertButton` only re-renders when its props (`children` or `onClick`) actually change

### When to use `React.memo`

✅ **Good cases:**

- Components that render frequently
- Pure components (same props = same output)
- Expensive child components
- Components that receive stable props
- List items in large lists

❌ **Don't use for:**

- Components that always receive new props
- Components with complex prop comparisons
- Components that are already cheap to render
- Root components (they always re-render anyway)

### Performance Example

```typescript
// ❌ BAD - ExpensiveChild re-renders on every parent update
const Parent = () => {
  const [count, setCount] = useState(0)
  const [otherState, setOtherState] = useState(0)

  return (
    <div>
      <button onClick={() => setOtherState(otherState + 1)}>
        Update Other State
      </button>
      <ExpensiveChild name="John" /> {/* Re-renders unnecessarily! */}
    </div>
  )
}

// ✅ GOOD - ExpensiveChild only re-renders when name changes
const ExpensiveChild = memo(({ name }) => {
  console.log('ExpensiveChild rendered')
  // Expensive calculations here
  return <div>Hello {name}</div>
})

const Parent = () => {
  const [count, setCount] = useState(0)
  const [otherState, setOtherState] = useState(0)

  return (
    <div>
      <button onClick={() => setOtherState(otherState + 1)}>
        Update Other State
      </button>
      <ExpensiveChild name="John" /> {/* Only re-renders when name changes! */}
    </div>
  )
}
```

### Key Points

- **Component Memoization**: Caches component render results
- **Props Comparison**: Only re-renders when props change
- **Performance**: Prevents unnecessary child re-renders
- **Memory**: Uses memory to store cached render results

`React.memo` is essentially React's way of saying "don't re-render this component unless its props actually changed!"

---

## What do you mean by memoized component?

A **memoized component** is a **cached render result** that React stores in memory to avoid re-rendering the same component when its props haven't changed.

### Simple Analogy

Think of it like a **photocopier with memory**:

```typescript
// First time you ask: "Render this component with props {name: 'John'}"
const MyComponent = memo(({ name }) => <div>Hello {name}</div>)
// React renders: <div>Hello John</div>
// React stores this result in memory

// Second time you ask: "Render this component with props {name: 'John'}"
// React thinks: "I already rendered this with the same props!"
// Returns cached result from memory: <div>Hello John</div>
// NO RE-RENDERING NEEDED! 🎉
```

### In Your Code Context

```typescript
const AlertButton = memo(({ children, onClick }) => {
  console.log('AlertButton rendered')
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
})

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Counter: {count}</h1>
      <AlertButton onClick={() => setCount(count + 1)}>
        Increment
      </AlertButton>
    </div>
  )
}
```

**What gets memoized:**

- **The render result**: The actual JSX/virtual DOM elements
- **Not the component function**: The component function itself
- **The render output**: The final rendered output of the component

### Step-by-Step Process

1. **First render (count = 0):**

   ```typescript
   // React renders: <button onClick={...}>Increment</button>
   // React stores this result in memory
   // Returns: button_element_12345
   // AlertButton props: {children: "Increment", onClick: function_67890}
   ```

2. **Second render (count = 1, but AlertButton props unchanged):**

   ```typescript
   // React checks: "Did AlertButton props change?" → No
   // React thinks: "I already rendered this component!"
   // Returns cached result from memory: button_element_12345
   // AlertButton thinks: "Same props, no need to re-render!" 🎉
   // Console.log doesn't execute!
   ```

3. **Third render (count = 2, but AlertButton props still unchanged):**

   ```typescript
   // React checks: "Did AlertButton props change?" → No
   // React thinks: "I already have this render result!"
   // Returns cached result: button_element_12345
   // Still no re-render needed!
   ```

4. **Fourth render (AlertButton gets new props):**

   ```typescript
   // React checks: "Did AlertButton props change?" → Yes!
   // React thinks: "I need to re-render with new props"
   // Renders: <button onClick={newFunction}>New Text</button>
   // Stores new result: button_element_99999
   // Console.log executes: "AlertButton rendered"
   ```

### Memory vs. Performance Trade-off

```typescript
// Without memoization:
// - Memory: Low (no render caching)
// - Performance: Slow (component re-renders unnecessarily)

// With memoization:
// - Memory: Higher (stores cached render results)
// - Performance: Fast (component skips unnecessary re-renders)
```

### The "Component" Part

The memoized **component** is the render result that gets cached:

```typescript
memo(() => {
  return <div>Hello World</div>  // ← This JSX gets memoized
})

memo(({ name }) => {
  return <h1>Welcome {name}</h1> // ← This JSX gets memoized
})

memo(({ data }) => {
  return (
    <div>
      <p>{data.title}</p>
      <button>Click me</button>
    </div>
  ) // ← This entire JSX tree gets memoized
})
```

### Custom Comparison Function

```typescript
// Default comparison (shallow comparison of all props)
const UserCard = memo(({ user, settings }) => {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
})

// Custom comparison - only re-render if user.name or user.email changed
const UserCard = memo(({ user, settings }) => {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
}, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  // Return false if props are different (re-render)
  return prevProps.user.name === nextProps.user.name &&
         prevProps.user.email === nextProps.user.email
})
```

### Real-World Impact

```typescript
// Without React.memo - ExpensiveList re-renders 1000 times
const Parent = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Update Count</button>
      <ExpensiveList items={stableItems} /> {/* Re-renders 1000 times! */}
    </div>
  )
}

// With React.memo - ExpensiveList only re-renders when items change
const ExpensiveList = memo(({ items }) => {
  console.log('ExpensiveList rendered') // Only logs when items change
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  )
})

const Parent = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Update Count</button>
      <ExpensiveList items={stableItems} /> {/* Only re-renders when items change! */}
    </div>
  )
}
```

So "memoized component" = "a component's render result that stays cached until its props actually change"

---

## Summary

`React.memo` is a performance optimization tool that:

- Caches component render results to prevent unnecessary re-renders
- Only re-renders when props actually change
- Prevents expensive child components from re-rendering unnecessarily
- Trades memory for significant performance gains
- Is especially useful for pure components and expensive child components

### Key Differences from useMemo and useCallback

- **useMemo**: Memoizes **values** (computed results)
- **useCallback**: Memoizes **functions** (function references)
- **React.memo**: Memoizes **components** (entire render results)

All three work together to optimize React performance by preventing unnecessary recalculations, function recreations, and component re-renders.

### Best Practices

- Use `React.memo` for expensive child components
- Combine with `useCallback` and `useMemo` for maximum optimization
- Use custom comparison functions when needed
- Don't over-memoize - measure performance first
- Remember that memoization has memory costs

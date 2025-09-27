# useCallback Hook

## What is useCallback?

`useCallback` is a React hook that **optimizes performance** by memoizing (caching) function references to prevent unnecessary re-renders of child components.

### What it does

`useCallback` returns a memoized version of a callback function that only changes if one of its dependencies has changed. This prevents child components from re-rendering when the parent re-renders with the same function reference.

### Basic Syntax

```typescript
const memoizedCallback = useCallback(
  () => {
    // Function logic here
    doSomething(a, b);
  },
  [a, b], // Dependencies array
);
```

### How it works

1. **First render**: Creates the function and stores the reference
2. **Subsequent renders**:
   - If dependencies haven't changed → returns the same function reference (prevents child re-renders!)
   - If dependencies changed → creates new function and stores new reference

### Real Example from Your Code Context

```typescript
const App = () => {
  const [count, setCount] = useState<number>(0)
  const [items] = useState<Item[]>(initialItems)

  // ❌ WITHOUT useCallback - new function on every render
  const handleIncrement = () => setCount(count + 1)

  // ✅ WITH useCallback - stable function reference
  const handleIncrement = useCallback(() => {
    setCount(count + 1)
  }, [count])

  return (
    <Layout>
      <h1>Counter: {count}</h1>
      <AlertButton onClick={handleIncrement}>
        Increment
      </AlertButton>
    </Layout>
  )
}
```

**What happens:**

- **Without useCallback**: `AlertButton` re-renders every time `App` re-renders (even if count didn't change)
- **With useCallback**: `AlertButton` only re-renders when `count` actually changes

### When to use `useCallback`

✅ **Good cases:**

- Passing functions as props to child components
- Functions used in dependency arrays of other hooks
- Event handlers that depend on state or props
- Functions passed to expensive child components wrapped in `React.memo`

❌ **Don't use for:**

- Functions that don't get passed as props
- Functions with no dependencies
- Simple functions that are recreated frequently
- Functions that always have different dependencies

### Performance Example

```typescript
// ❌ BAD - child re-renders on every parent render
const Parent = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => setCount(count + 1) // New function every render

  return <ExpensiveChild onClick={handleClick} />
}

// ✅ GOOD - child only re-renders when count changes
const Parent = () => {
  const [count, setCount] = useState(0)

  const handleClick = useCallback(() => setCount(count + 1), [count])

  return <ExpensiveChild onClick={handleClick} />
}
```

### Key Points

- **Function Reference Stability**: Keeps the same function reference across renders
- **Dependencies**: Controls when to create a new function
- **Child Optimization**: Prevents unnecessary child component re-renders
- **Memory**: Uses a small amount of memory to store cached function references

`useCallback` is essentially React's way of saying "don't create a new function unless you really need to!"

---

## What do you mean by memoized callback?

A **memoized callback** is a **cached function reference** that React stores in memory to avoid recreating the same function over and over, preventing unnecessary child component re-renders.

### Simple Analogy

Think of it like a **phone number that stays the same**:

```typescript
// First time you ask: "What's the function to increment?"
const handleClick = useCallback(() => setCount(count + 1), [count])
// React creates: function_12345
// React stores function_12345 in memory

// Second time you ask: "What's the function to increment?"
// React thinks: "I already created this function! It's function_12345"
// Returns function_12345 from memory (no new function creation needed)
```

### In Your Code Context

```typescript
const App = () => {
  const [count, setCount] = useState<number>(0)

  const handleIncrement = useCallback(() => {
    setCount(count + 1)
  }, [count])

  return (
    <AlertButton onClick={handleIncrement}>
      Increment
    </AlertButton>
  )
}
```

**What gets memoized:**

- **The function reference**: The actual function object in memory
- **Not the function execution**: The function still runs when called
- **The reference stability**: Same memory address for the function

### Step-by-Step Process

1. **First render (count = 0):**

   ```typescript
   // React creates: function_12345 = () => setCount(0 + 1)
   // React stores function_12345 in memory
   // Returns: function_12345
   // AlertButton receives: onClick={function_12345}
   ```

2. **Second render (count still 0):**

   ```typescript
   // React checks: "Did count change?" → No
   // React thinks: "I already have this function!"
   // Returns cached reference: function_12345
   // AlertButton receives: onClick={function_12345} (SAME REFERENCE!)
   // AlertButton thinks: "Same function, no need to re-render!" 🎉
   ```

3. **Third render (count = 1):**

   ```typescript
   // React checks: "Did count change?" → Yes! (0 → 1)
   // React thinks: "I need a new function with updated count"
   // Creates: function_67890 = () => setCount(1 + 1)
   // Stores function_67890 in memory
   // Returns: function_67890
   // AlertButton receives: onClick={function_67890} (NEW REFERENCE!)
   // AlertButton re-renders because function reference changed
   ```

### Memory vs. Performance Trade-off

```typescript
// Without memoization:
// - Memory: Low (no function caching)
// - Performance: Slow (child components re-render unnecessarily)

// With memoization:
// - Memory: Slightly higher (stores cached function references)
// - Performance: Fast (child components skip unnecessary re-renders)
```

### The "Callback" Part

The memoized **callback** is the function that gets passed around:

```typescript
useCallback(() => {
  return "Hello World"  // ← This function gets memoized
}, [])

useCallback((name) => {
  return `Hello ${name}` // ← This function gets memoized
}, [])

useCallback(() => {
  setState(prev => prev + 1) // ← This function gets memoized
}, [])
```

### Real-World Impact

```typescript
// Without useCallback - ExpensiveChild re-renders 100 times
const Parent = () => {
  const [count, setCount] = useState(0)
  const [otherState, setOtherState] = useState(0)

  const handleClick = () => setCount(count + 1) // New function every render

  return (
    <div>
      <button onClick={() => setOtherState(otherState + 1)}>
        Update Other State
      </button>
      <ExpensiveChild onClick={handleClick} /> {/* Re-renders 100 times! */}
    </div>
  )
}

// With useCallback - ExpensiveChild only re-renders when count changes
const Parent = () => {
  const [count, setCount] = useState(0)
  const [otherState, setOtherState] = useState(0)

  const handleClick = useCallback(() => setCount(count + 1), [count])

  return (
    <div>
      <button onClick={() => setOtherState(otherState + 1)}>
        Update Other State
      </button>
      <ExpensiveChild onClick={handleClick} /> {/* Only re-renders when count changes! */}
    </div>
  )
}
```

So "memoized callback" = "a function reference that stays the same across renders, stored in memory for reuse"

---

## Summary

`useCallback` is a performance optimization hook that:

- Caches function references to prevent recreation
- Only creates new functions when dependencies change
- Prevents unnecessary child component re-renders
- Trades a small amount of memory for significant performance gains
- Is especially useful when passing functions to memoized child components or using functions in dependency arrays

### Key Difference from useMemo

- **useMemo**: Memoizes **values** (computed results)
- **useCallback**: Memoizes **functions** (function references)

Both work together to optimize React performance by preventing unnecessary recalculations and re-renders.

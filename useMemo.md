# useMemo Hook

## What is useMemo?

`useMemo` is a React hook that **optimizes performance** by memoizing (caching) the result of expensive calculations.

### What it does

`useMemo` prevents unnecessary recalculations by storing the result of a computation and only recalculating it when its dependencies change.

### Basic Syntax

```typescript
const memoizedValue = useMemo(() => {
  // Expensive calculation here
  return expensiveCalculation(a, b);
}, [a, b]); // Dependencies array
```

### How it works

1. **First render**: Runs the calculation and stores the result
2. **Subsequent renders**:
   - If dependencies haven't changed → returns cached result (fast!)
   - If dependencies changed → recalculates and stores new result

### Real Example from Your Code

```typescript
const selectedItems = useMemo(() =>
  items.find(item => item.isSelected),
  [items]
)
```

**What happens:**

- Searches through 29,999,999 items to find the selected one
- **Without useMemo**: This search runs on EVERY render (very slow!)
- **With useMemo**: Search only runs when `items` array changes (much faster!)

### When to use `useMemo`

✅ **Good cases:**

- Expensive calculations (loops, filtering, sorting)
- Large data transformations
- Creating objects/arrays that would cause child re-renders

❌ **Don't use for:**

- Simple calculations (addition, string concatenation)
- Primitive values that don't change often

### Performance Example

```typescript
// ❌ BAD - recalculates every render
const expensiveValue = items.filter(item => item.isSelected).length

// ✅ GOOD - only recalculates when items change
const expensiveValue = useMemo(() =>
  items.filter(item => item.isSelected).length,
  [items]
)
```

### Key Points

- **Memoization**: Caching computed values
- **Dependencies**: Controls when to recalculate
- **Performance**: Prevents unnecessary work
- **Memory**: Uses a bit more memory to store cached results

`useMemo` is essentially React's way of saying "don't do this expensive work again unless you really need to!"

---

## What do you mean by memoized value?

A **memoized value** is a **cached result** that React stores in memory to avoid recalculating the same thing over and over.

### Simple Analogy

Think of it like a **calculator with memory**:

```typescript
// First time you ask: "What's 2 + 2?"
const result = useMemo(() => 2 + 2, [])
// React calculates: 2 + 2 = 4
// React stores 4 in memory

// Second time you ask: "What's 2 + 2?"
// React thinks: "I already calculated this! It's 4"
// Returns 4 from memory (no calculation needed)
```

### In Your Code Context

```typescript
const selectedItems = useMemo(() =>
  items.find(item => item.isSelected),
  [items]
)
```

**What gets memoized:**

- **The result**: The found item object (or undefined)
- **Not the function**: The `items.find()` function itself

### Step-by-Step Process

1. **First render:**

   ```typescript
   // React runs: items.find(item => item.isSelected)
   // Finds item with id: 29,999,998
   // Stores this result in memory
   // Returns: { id: 29,999,998, isSelected: true }
   ```

2. **Second render (items haven't changed):**

   ```typescript
   // React checks: "Did items change?" → No
   // React thinks: "I already know the answer!"
   // Returns cached result from memory: { id: 29,999,998, isSelected: true }
   // NO SEARCH THROUGH 29 MILLION ITEMS! 🎉
   ```

3. **Third render (items array changed):**

   ```typescript
   // React checks: "Did items change?" → Yes!
   // React thinks: "I need to recalculate"
   // Runs search again and stores new result
   ```

### Memory vs. Performance Trade-off

```typescript
// Without memoization:
// - Memory: Low (no caching)
// - Performance: Slow (recalculates every time)

// With memoization:
// - Memory: Slightly higher (stores cached result)
// - Performance: Fast (reuses cached result)
```

### The "Value" Part

The memoized **value** is whatever your function returns:

```typescript
useMemo(() => {
  return "Hello World"  // ← This string gets memoized
}, [])

useMemo(() => {
  return [1, 2, 3]      // ← This array gets memoized
}, [])

useMemo(() => {
  return { name: "John" } // ← This object gets memoized
}, [])
```

So "memoized value" = "the result of your calculation, stored in memory for reuse"

---

## Summary

`useMemo` is a performance optimization hook that:

- Caches expensive calculation results
- Only recalculates when dependencies change
- Trades a small amount of memory for significant performance gains
- Is especially useful for operations on large datasets (like your 29M+ items array)

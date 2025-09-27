# React Performance Optimization Guide

## Why Performance is Critical in React

### User Experience Impact

**Performance directly affects user satisfaction:**

- **Slow renders** create laggy, unresponsive interfaces
- **Poor performance** leads to user frustration and app abandonment
- **Mobile devices** have limited resources - poor performance is more noticeable
- **SEO impact** - Google considers page speed in search rankings

### Technical Consequences

**Without optimization, React apps can suffer from:**

- **Unnecessary re-renders** consuming CPU cycles
- **Memory leaks** from inefficient state management
- **Bundle bloat** slowing initial page loads
- **Poor scalability** as your app grows

### Real-World Example

```typescript
// ❌ BAD - This component re-renders on every parent update
const ExpensiveComponent = ({ data }) => {
  const processedData = data.map(item =>
    expensiveCalculation(item)
  ) // Runs on EVERY render!

  return <div>{processedData}</div>
}
```

**Problem:** If parent re-renders 100 times, `expensiveCalculation` runs 100 times unnecessarily.

---

## React Performance Solutions

### 1. Memoization Hooks

#### `useMemo` - Expensive Calculations

```typescript
import { useMemo } from 'react'

const ExpensiveComponent = ({ items }) => {
  const processedData = useMemo(() => {
    return items.map(item => expensiveCalculation(item))
  }, [items]) // Only recalculates when items change

  return <div>{processedData}</div>
}
```

**When to use:**

- Heavy computations (sorting, filtering large arrays)
- Creating objects/arrays that cause child re-renders
- Mathematical calculations

#### `useCallback` - Function References

```typescript
import { useCallback } from 'react'

const ParentComponent = () => {
  const [count, setCount] = useState(0)

  // ✅ GOOD - Function reference stays stable
  const handleClick = useCallback(() => {
    console.log('Button clicked')
  }, [])

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <ExpensiveChild onUpdate={handleClick} />
    </div>
  )
}
```

**When to use:**

- Passing functions as props to child components
- Event handlers that depend on state
- Functions used in dependency arrays

### 2. Component Memoization

#### `React.memo` - Prevent Unnecessary Re-renders

```typescript
import { memo } from 'react'

// ✅ GOOD - Component only re-renders when props change
const ExpensiveChild = memo(({ data, onUpdate }) => {
  console.log('ExpensiveChild rendered') // Only logs when props change

  return (
    <div>
      <h2>{data.title}</h2>
      <button onClick={onUpdate}>Update</button>
    </div>
  )
})
```

**When to use:**

- Components that render frequently
- Pure components (same props = same output)
- Expensive child components

#### Custom Comparison Function

```typescript
const UserCard = memo(({ user }) => {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison - only re-render if name or email changed
  return prevProps.user.name === nextProps.user.name &&
         prevProps.user.email === nextProps.user.email
})
```

### 3. State Management Optimization

#### Avoid Object Recreation

```typescript
// ❌ BAD - Creates new object on every render
const Component = () => {
  const [count, setCount] = useState(0)

  const config = {
    theme: 'dark',
    size: 'large'
  } // New object every time!

  return <ExpensiveChild config={config} />
}

// ✅ GOOD - Stable object reference
const Component = () => {
  const [count, setCount] = useState(0)

  const config = useMemo(() => ({
    theme: 'dark',
    size: 'large'
  }), []) // Same object reference

  return <ExpensiveChild config={config} />
}
```

#### Optimize State Updates

```typescript
// ❌ BAD - Multiple state updates
const handleClick = () => {
  setCount(count + 1)
  setName('New Name')
  setAge(age + 1)
} // Triggers 3 re-renders

// ✅ GOOD - Batch updates
const handleClick = () => {
  setState(prev => ({
    ...prev,
    count: prev.count + 1,
    name: 'New Name',
    age: prev.age + 1
  }))
} // Triggers 1 re-render
```

### 4. Code Splitting & Lazy Loading

#### Dynamic Imports

```typescript
import { lazy, Suspense } from 'react'

// Lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'))
const DataTable = lazy(() => import('./DataTable'))

const App = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading chart...</div>}>
        <HeavyChart />
      </Suspense>
      <Suspense fallback={<div>Loading table...</div>}>
        <DataTable />
      </Suspense>
    </div>
  )
}
```

#### Route-based Code Splitting

```typescript
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```

### 5. List Optimization

#### Virtual Scrolling for Large Lists

```typescript
import { FixedSizeList as List } from 'react-window'

const LargeList = ({ items }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  )

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </List>
  )
}
```

#### Key Optimization for Lists

```typescript
// ✅ GOOD - Stable, unique keys
const UserList = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li> // Stable ID
      ))}
    </ul>
  )
}

// ❌ BAD - Index as key (causes re-renders)
const UserList = ({ users }) => {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>{user.name}</li> // Unstable key
      ))}
    </ul>
  )
}
```

### 6. Bundle Optimization

#### Tree Shaking

```typescript
// ✅ GOOD - Import only what you need
import { useState } from 'react'
import { debounce } from 'lodash-es'

// ❌ BAD - Import entire library
import * as React from 'react'
import _ from 'lodash'
```

#### Bundle Analysis

```bash
# Analyze your bundle
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

### 7. Development Tools

#### React DevTools Profiler

1. Install React DevTools browser extension
2. Open Profiler tab
3. Record interactions
4. Analyze render times and identify bottlenecks

#### Performance Monitoring

```typescript
// Measure component render time
const Component = () => {
  useEffect(() => {
    const start = performance.now()

    return () => {
      const end = performance.now()
      console.log(`Component rendered in ${end - start}ms`)
    }
  })

  return <div>Content</div>
}
```

---

## Performance Best Practices Summary

### Do's ✅

- Use `useMemo` for expensive calculations
- Use `useCallback` for stable function references
- Wrap expensive components with `React.memo`
- Implement code splitting for large apps
- Use virtual scrolling for long lists
- Optimize images and assets
- Monitor performance regularly

### Don'ts ❌

- Don't over-optimize prematurely
- Don't use `useMemo` for simple calculations
- Don't create objects/arrays in render
- Don't use index as keys in lists
- Don't ignore bundle size
- Don't skip performance testing

### Performance Checklist

- [ ] Identify performance bottlenecks with DevTools
- [ ] Implement memoization where needed
- [ ] Optimize re-renders with `React.memo`
- [ ] Use code splitting for large bundles
- [ ] Optimize images and assets
- [ ] Test performance on slow devices
- [ ] Monitor Core Web Vitals
- [ ] Regular performance audits

---

## Conclusion

React performance optimization is crucial for creating fast, responsive applications. By understanding when and how to use these optimization techniques, you can build applications that provide excellent user experiences while efficiently managing system resources.

Remember: **Measure first, optimize second**. Always profile your app to identify actual bottlenecks before applying optimizations.

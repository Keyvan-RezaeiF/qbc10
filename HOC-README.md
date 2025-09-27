# Higher-Order Components (HOCs)

## What is a Higher-Order Component?

A **Higher-Order Component (HOC)** is a **function** that takes a component as an argument and returns a new enhanced component with additional functionality, props, or behavior.

### What it does

HOCs are a pattern for reusing component logic by wrapping components with additional functionality. They follow the principle of composition over inheritance and allow you to share common functionality across multiple components without modifying their original code.

### Basic Syntax

```typescript
import { ComponentType } from 'react'

// HOC function
const withEnhancement = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    // Additional logic here
    const enhancedProps = {
      ...props,
      // Add new props or modify existing ones
      additionalData: 'Hello from HOC'
    }

    return <WrappedComponent {...enhancedProps} />
  }
}

// Usage
const MyComponent = ({ name, additionalData }) => (
  <div>
    <h2>{name}</h2>
    <p>{additionalData}</p>
  </div>
)

const EnhancedComponent = withEnhancement(MyComponent)
```

### How it works

1. **Input**: Takes a component as an argument
2. **Enhancement**: Adds new functionality, props, or behavior
3. **Output**: Returns a new enhanced component
4. **Composition**: The enhanced component wraps the original component

### Real Example from Your Code Context

```typescript
// HOC for adding loading state
const withLoading = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(false)

    if (isLoading) {
      return <div>Loading...</div>
    }

    return (
      <WrappedComponent
        {...props}
        setIsLoading={setIsLoading}
      />
    )
  }
}

// Original component
const UserProfile = ({ user, setIsLoading }) => {
  const handleSave = async () => {
    setIsLoading(true)
    // Save user data
    await saveUser(user)
    setIsLoading(false)
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <button onClick={handleSave}>Save</button>
    </div>
  )
}

// Enhanced component
const UserProfileWithLoading = withLoading(UserProfile)

// Usage in your App
const App = () => {
  return (
    <Layout>
      <UserProfileWithLoading user={{ name: 'John' }} />
    </Layout>
  )
}
```

**What happens:**

- **Without HOC**: `UserProfile` has no loading state management
- **With HOC**: `UserProfileWithLoading` automatically gets loading functionality
- **Reusability**: You can use `withLoading` with any component that needs loading state

### When to use HOCs

✅ **Good cases:**

- Adding common functionality to multiple components
- Cross-cutting concerns (logging, authentication, loading states)
- Props manipulation or enhancement
- Conditional rendering logic
- State management patterns

❌ **Don't use for:**

- Simple prop passing
- One-off functionality
- When hooks can solve the problem more elegantly
- Over-complicating simple components
- When render props or compound components are better suited

### Common HOC Examples

#### Authentication HOC

```typescript
const withAuth = (WrappedComponent) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
      // Check authentication
      checkAuth().then(setIsAuthenticated)
    }, [])

    if (!isAuthenticated) {
      return <LoginForm />
    }

    return <WrappedComponent {...props} />
  }
}

// Usage
const ProtectedDashboard = withAuth(Dashboard)
```

#### Logging HOC

```typescript
const withLogging = (WrappedComponent) => {
  return (props) => {
    useEffect(() => {
      console.log(`${WrappedComponent.name} mounted`)

      return () => {
        console.log(`${WrappedComponent.name} unmounted`)
      }
    }, [])

    return <WrappedComponent {...props} />
  }
}

// Usage
const LoggedButton = withLogging(AlertButton)
```

### Key Points

- **Composition**: Combines components to create new functionality
- **Reusability**: Same HOC can enhance multiple components
- **Separation of Concerns**: Keeps logic separate from UI components
- **Flexibility**: Can be composed with other HOCs

HOCs are essentially React's way of saying "add this functionality to any component without modifying its original code!"

---

## What do you mean by higher-order component?

A **higher-order component** is a **function that operates on components** - it takes a component as input and returns an enhanced version of that component with additional capabilities.

### Simple Analogy

Think of it like a **smart wrapper** or **decorator**:

```typescript
// Original component
const SimpleButton = ({ text }) => <button>{text}</button>

// HOC (the wrapper)
const withClickCounter = (Component) => {
  return (props) => {
    const [count, setCount] = useState(0)

    return (
      <div>
        <Component {...props} onClick={() => setCount(count + 1)} />
        <p>Clicked {count} times</p>
      </div>
    )
  }
}

// Enhanced component
const ButtonWithCounter = withClickCounter(SimpleButton)

// Now ButtonWithCounter has click counting functionality!
```

### In Your Code Context

```typescript
// HOC for adding theme functionality
const withTheme = (WrappedComponent) => {
  return (props) => {
    const [isDark, setIsDark] = useState(false)

    const themeProps = {
      ...props,
      theme: isDark ? 'dark' : 'light',
      toggleTheme: () => setIsDark(!isDark)
    }

    return <WrappedComponent {...themeProps} />
  }
}

// Your existing AlertButton
const AlertButton = ({ children, onClick, theme, toggleTheme }) => {
  const buttonStyle = {
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
    color: theme === 'dark' ? '#fff' : '#333'
  }

  return (
    <div>
      <button onClick={onClick} style={buttonStyle}>
        {children}
      </button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}

// Enhanced version with theme
const ThemedAlertButton = withTheme(AlertButton)

// Usage
const App = () => {
  return (
    <Layout>
      <ThemedAlertButton onClick={() => console.log('Clicked')}>
        Click Me
      </ThemedAlertButton>
    </Layout>
  )
}
```

**What gets enhanced:**

- **The component**: AlertButton gets new theme-related props
- **The functionality**: Automatic theme state management
- **The behavior**: Can now toggle between light and dark themes
- **The reusability**: withTheme can be used with any component

### Step-by-Step Process

1. **Input component:**

   ```typescript
   // Original component
   const MyComponent = ({ name }) => <h1>Hello {name}</h1>
   ```

2. **HOC function:**

   ```typescript
   // HOC that adds styling
   const withStyling = (WrappedComponent) => {
     return (props) => {
       const style = {
         padding: '20px',
         border: '1px solid #ccc',
         borderRadius: '8px'
       }

       return (
         <div style={style}>
           <WrappedComponent {...props} />
         </div>
       )
     }
   }
   ```

3. **Enhanced component:**

   ```typescript
   // New component with styling
   const StyledComponent = withStyling(MyComponent)

   // Usage
   <StyledComponent name="John" />
   // Renders: <div style={...}><h1>Hello John</h1></div>
   ```

### Function vs Component Concept

```typescript
// HOC is a FUNCTION that takes a COMPONENT
const withFeature = (Component) => {  // ← Function parameter
  return (props) => {                 // ← Returns a new component
    // Enhancement logic
    return <Component {...props} />
  }
}

// Component is a FUNCTION that returns JSX
const MyComponent = (props) => {      // ← Component function
  return <div>{props.children}</div>  // ← Returns JSX
}
```

### Composition vs Inheritance

```typescript
// ❌ Inheritance approach (not recommended in React)
class BaseComponent extends React.Component {
  // Base functionality
}

class MyComponent extends BaseComponent {
  // Inherits base functionality
}

// ✅ Composition approach (HOCs)
const withBaseFeature = (Component) => {
  return (props) => {
    // Base functionality
    return <Component {...props} />
  }
}

const MyComponent = withBaseFeature((props) => {
  // Uses base functionality through composition
  return <div>{props.children}</div>
})
```

### Memory vs. Performance Trade-off

```typescript
// Without HOC:
// - Memory: Low (no wrapper components)
// - Reusability: Low (logic duplicated in each component)

// With HOC:
// - Memory: Slightly higher (wrapper components)
// - Reusability: High (logic shared across components)
// - Maintainability: High (single source of truth)
```

### The "Higher-Order" Part

The term "higher-order" comes from mathematics and functional programming:

```typescript
// First-order function (takes values)
const add = (a, b) => a + b

// Higher-order function (takes functions)
const withLogging = (fn) => {
  return (...args) => {
    console.log('Calling function with:', args)
    return fn(...args)
  }
}

// First-order component (takes props)
const Button = ({ text }) => <button>{text}</button>

// Higher-order component (takes components)
const withClickHandler = (Component) => {
  return (props) => <Component {...props} onClick={handleClick} />
}
```

### Real-World Impact

```typescript
// Without HOC - Logic duplicated
const UserCard = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await saveUser(user)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <h3>{user.name}</h3>
      <button onClick={handleSave}>Save</button>
    </div>
  )
}

const ProductCard = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false)  // Duplicated!
  const [error, setError] = useState(null)           // Duplicated!

  const handleSave = async () => {
    setIsLoading(true)  // Duplicated logic!
    try {
      await saveProduct(product)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <h3>{product.name}</h3>
      <button onClick={handleSave}>Save</button>
    </div>
  )
}

// With HOC - Logic shared
const withAsyncSave = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleAsyncSave = async (saveFunction) => {
      setIsLoading(true)
      try {
        await saveFunction()
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    return (
      <div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        <WrappedComponent
          {...props}
          handleAsyncSave={handleAsyncSave}
        />
      </div>
    )
  }
}

const UserCard = withAsyncSave(({ user, handleAsyncSave }) => (
  <div>
    <h3>{user.name}</h3>
    <button onClick={() => handleAsyncSave(() => saveUser(user))}>
      Save
    </button>
  </div>
))

const ProductCard = withAsyncSave(({ product, handleAsyncSave }) => (
  <div>
    <h3>{product.name}</h3>
    <button onClick={() => handleAsyncSave(() => saveProduct(product))}>
      Save
    </button>
  </div>
))
```

So "higher-order component" = "a function that takes a component and returns an enhanced component with additional functionality"

---

## Summary

Higher-Order Components (HOCs) are a powerful pattern that:

- Takes components as input and returns enhanced components
- Enables code reuse and separation of concerns
- Follows composition over inheritance principles
- Allows sharing common functionality across multiple components
- Provides a clean way to add cross-cutting concerns

### Key Benefits

- **Reusability**: Share logic across multiple components
- **Separation of Concerns**: Keep logic separate from UI
- **Composition**: Build complex functionality by combining simpler parts
- **Maintainability**: Single source of truth for shared logic

### Modern Alternatives

While HOCs are still useful, modern React patterns include:

- **Custom Hooks**: For stateful logic sharing
- **Render Props**: For dynamic rendering logic
- **Compound Components**: For related component composition

### Best Practices

- Use HOCs for cross-cutting concerns
- Keep HOCs pure and predictable
- Consider modern alternatives when appropriate
- Don't over-engineer simple functionality
- Combine HOCs thoughtfully to avoid "wrapper hell"

HOCs remain a valuable tool in the React developer's toolkit for creating reusable, composable component logic!

---

## Hooks vs HOCs: Which is Better?

The answer is **"it depends on the use case"**, but generally **hooks are preferred in modern React development**. Here's a detailed comparison:

### **Hooks are Better For:**

#### ✅ **Stateful Logic**

```typescript
// Hook approach - Clean and direct
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  return { count, increment, decrement }
}

// Usage
const MyComponent = () => {
  const { count, increment, decrement } = useCounter(10)
  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}
```

#### ✅ **Lifecycle Effects**

```typescript
// Hook approach - Clear and focused
const useApiData = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading }
}
```

#### ✅ **Component Logic Reuse**

```typescript
// Hook approach - No wrapper components
const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth().then(setUser).finally(() => setLoading(false))
  }, [])

  return { user, loading, login: setUser }
}

// Multiple components can use the same hook
const Dashboard = () => {
  const { user, loading } = useAuth()
  // ...
}

const Profile = () => {
  const { user, loading } = useAuth()
  // ...
}
```

### **HOCs are Better For:**

#### ✅ **Conditional Rendering Logic**

```typescript
// HOC approach - Clean conditional rendering
const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useAuth() // Can use hooks inside HOCs!

    if (loading) return <LoadingSpinner />
    if (!user) return <LoginForm />

    return <WrappedComponent {...props} user={user} />
  }
}

const ProtectedDashboard = withAuth(Dashboard)
```

#### ✅ **Props Enhancement**

```typescript
// HOC approach - Adding props to components
const withTheme = (WrappedComponent) => {
  return (props) => {
    const theme = useContext(ThemeContext)
    return <WrappedComponent {...props} theme={theme} />
  }
}
```

#### ✅ **Cross-cutting Concerns**

```typescript
// HOC approach - Adding functionality to multiple components
const withErrorBoundary = (WrappedComponent) => {
  return class extends Component {
    state = { hasError: false }

    static getDerivedStateFromError(error) {
      return { hasError: true }
    }

    render() {
      if (this.state.hasError) {
        return <ErrorFallback />
      }
      return <WrappedComponent {...this.props} />
    }
  }
}
```

### **Direct Comparison Examples**

#### **Loading State Management**

**Hook Approach** ✅

```typescript
const useAsync = (asyncFunction) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setError(null)
    try {
      const result = await asyncFunction(...args)
      return result
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [asyncFunction])

  return { loading, error, execute }
}

// Usage
const MyComponent = () => {
  const { loading, error, execute } = useAsync(saveData)

  const handleSave = () => execute(formData)

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <button onClick={handleSave}>Save</button>
    </div>
  )
}
```

**HOC Approach** ❌

```typescript
const withAsync = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const execute = async (fn) => {
      setLoading(true)
      try {
        await fn()
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    return (
      <div>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        <WrappedComponent {...props} execute={execute} />
      </div>
    )
  }
}
```

### **Performance Comparison**

#### **Hooks** ✅

- **Better tree-shaking**: Only imports what you use
- **No wrapper components**: Fewer components in React tree
- **Better DevTools**: Clearer component hierarchy
- **Easier testing**: Test logic separately from components

#### **HOCs** ❌

- **Wrapper hell**: Can create deeply nested component trees
- **Harder debugging**: Multiple wrapper layers
- **Props drilling**: Can obscure prop flow
- **Bundle size**: May include unused functionality

### **Modern React Recommendation**

#### **Use Hooks When:**

- Managing state or side effects
- Reusing logic across components
- Building custom functionality
- Working with context or lifecycle

#### **Use HOCs When:**

- Adding conditional rendering logic
- Enhancing components with additional props
- Creating error boundaries
- Adding cross-cutting concerns (logging, analytics)

#### **Hybrid Approach** ✅

```typescript
// Best of both worlds
const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth().then(setUser).finally(() => setLoading(false))
  }, [])

  return { user, loading, login: setUser }
}

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useAuth()

    if (loading) return <LoadingSpinner />
    if (!user) return <LoginForm />

    return <WrappedComponent {...props} user={user} />
  }
}
```

### **Conclusion**

**Hooks are generally better** for most use cases because they:

- Are more direct and easier to understand
- Don't create wrapper components
- Have better performance characteristics
- Are the modern React pattern

**HOCs still have their place** for:

- Conditional rendering patterns
- Props enhancement
- Error boundaries
- Cross-cutting concerns

**The key is**: Use hooks for logic, use HOCs for rendering patterns, and often combine them for the best results!

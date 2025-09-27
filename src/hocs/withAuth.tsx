import { useState, type ComponentType } from "react"

const withAuth = (WrappedComponent: ComponentType<any>) => {
  const isAuthenticated = true

  return (props: any) => {
    if (isAuthenticated === undefined) {
      return <p>Loading...</p>
    }

    if (!isAuthenticated) {
      return (
        <div>
          <button>Go to login page</button>
        </div>
      )
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth
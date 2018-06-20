import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// import * as Storage from '@utils/storage'

const isAuthenticated = true // Object.keys(Storage.getStore('users')).length > 0

const AuthRoute = ({ component: Component, ...arg }) => (
  <Route
    {...arg}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default AuthRoute

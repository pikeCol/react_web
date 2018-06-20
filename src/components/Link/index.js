import React from 'react'
import { Route, Link } from 'react-router-dom'
const MenuLink = ({ label, to, exact }) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => (
      <div className={match ? 'active' : ''}>
        {match ? '> ' : ''}
        <Link to={to}>{label}</Link>
      </div>
    )}
  />
)

export default MenuLink

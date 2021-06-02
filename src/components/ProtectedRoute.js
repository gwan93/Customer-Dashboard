import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function ProtectedRoute({ component: Component, state, ...rest }) {
  const [loading, setLoading] = useState(true);

  // This protects the dashboard route from being accessed by unauthorized users
  // The ProtectedRoute component is rendered in a loading state
  // and will wait for state to be updated before finish loading

  // Without the useEffect, users who hard refresh while at /dashboard
  // will automatically be redirected to the /unauthorized page before
  // the state has finished updating

  // If the user is indeed not logged in and is trying to access
  // /dashboard, then they will be redirected to the /unauthorized
  // page

  useEffect(() => {
    setLoading(false)
  }, [state])
  
  return (
    <div>
      {loading && <h1>Loading data. Please wait.</h1>}
      {!loading && (
        <Route {...rest} render={
          props => {
            if (state.username !== "" && state.userId !== null) {
              return <Component {...rest} {...props} state={state}/>
            } else {
              return <Redirect to={
                {
                  pathname: '/unauthorized',
                  state: {
                    from: props.location
                  }
                }
              } />
            }
          }
        } />
      )}
    </div>
  )
}

ProtectedRoute.propTypes = {
  state: PropTypes.shape({
    username: PropTypes.string,
    userId: PropTypes.oneOfType([ PropTypes.bool, PropTypes.number ])
  }).isRequired,
  setState: PropTypes.func,
  removeCookie: PropTypes.func
}
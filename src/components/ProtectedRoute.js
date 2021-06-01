import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ component: Component, state, ...rest }) {
  const [loading, setLoading] = useState(true);

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
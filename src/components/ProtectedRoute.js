import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, state, ...rest }) {
  return (
    <Route {...rest} render={
      props => {
        if (state.username !== "" && state.userId !== null) {
          return <Component {...rest} {...props} {...state}/>
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
  )
}
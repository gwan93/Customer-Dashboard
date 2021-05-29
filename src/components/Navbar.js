import { Link } from "react-router-dom";

export default function Navbar(props) {
  const { state } = props;

  return (
    <div>
      <Link to="/">Home </Link>
      {state.username && <Link to="/dashboard">Dashboard </Link>}
      {!state.username && <Link to="/login">Login </Link>}
    </div>
  )
}
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import axios from 'axios';


export default function Logout(props) {
  const history = useHistory();
  const { setState, removeCookie } = props;

  function logoutUser() {
    axios.post("/logout")
    .then(() => {
      setState({
        username: "",
        userId: null
      })
      removeCookie("userInfo");
      history.push("/");

    })
  }

  return (
    <>
      <Button variant="outlined" onClick={logoutUser}>Logout</Button>
    </>
  )
}
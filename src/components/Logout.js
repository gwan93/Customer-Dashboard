import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  logoutButton: {
    width: '100px'
  }
});

export default function Logout(props) {
  const classes = useStyles();
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
      <Button variant="contained" className={classes.logoutButton} onClick={logoutUser}>Logout</Button>
    </>
  )
}
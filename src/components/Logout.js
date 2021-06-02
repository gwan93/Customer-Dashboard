import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  logoutButton: {
    width: '100px',
    borderRadius: '22px'
  }
});

export default function Logout(props) {
  const classes = useStyles();
  const history = useHistory();
  const { setState, removeCookie } = props;

  // Submits request to backend to delete Express cookie
  // Then resets state and removes client Cookie
  // Finally redirects to home page
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
      <Button variant="contained" className={classes.logoutButton} color="secondary" onClick={logoutUser}>Logout</Button>
    </>
  )
}

Logout.propTypes = {
  setState: PropTypes.func.isRequired,
  removeCookie: PropTypes.func.isRequired
}
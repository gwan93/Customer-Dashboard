import { TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  formElement: {
    display: 'block'
  }
});


export default function Login(props) {
  const history = useHistory();
  const classes = useStyles();
  const { state, setState, setCookie } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (username.length === 0 || password.length === 0) {
      setErrorMessage("Please provide a username and a password.");
      return;
    }
    console.log(username, password);
    const postObj = {username, password};
    axios.post("/login", postObj)
    .then(response => {
      if (response.data.status === 401) {
        setErrorMessage("Incorrect username or password.");
        return;
      }
      setState({
        ...state,
        username: response.data.username,
        userId: response.data.id
      })
      setCookie("userInfo", {username: response.data.username, userId: response.data.id}, {path: "/"})
      history.push("/dashboard");
    })
    .catch(err => {
      console.log("ERROR", err)
    })

    // post information
    // set loading
    // analyze response
    // if fail then show error message
    // if successful then redirect to home

  }

  return (
    <>
      <h1>Login</h1>
      {errorMessage.length > 0 && <h6>{errorMessage}</h6>}
      <TextField
        required
        type="text"
        id="username"
        label="Username"
        value={username}
        variant="outlined"
        onChange={(e) => setUsername(e.target.value)}
        className={classes.formElement}
      />

      <TextField
        required
        type="password"
        id="password"
        label="Password"
        value={password}
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
        className={classes.formElement}
      />

      <Button type="submit" variant="contained" onClick={(e) => onSubmit(e)}>
        Login
      </Button>
    </>
  );
}
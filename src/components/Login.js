import { TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles({
  formElement: {
    display: 'block'
  }
});


export default function Login(props) {
  const classes = useStyles();
  const { state, setState, setCookie } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    const postObj = {username, password};
    axios.post("/login", postObj)
    .then(response => {
      console.log("SUCCESS", response)
      setState({
        ...state,
        username: response.data.username,
        userId: response.data.id
      })
      setCookie("userInfo", {username: response.data.username, userId: response.data.id}, {path: "/"})
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
import { TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  formElement: {
    display: 'block'
  }
});


export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
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
        id="email"
        label="Email"
        value={email}
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
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
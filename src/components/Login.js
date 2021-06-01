import { TextField, Button, Avatar, CssBaseline, Link, Grid, Typography, Container } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
  formElement: {
    display: 'block'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const history = useHistory(); // For redirection after successful login
  const classes = useStyles();
  const { state, setState, setCookie } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Provide user feedback on unsuccessful login

  const onSubmit = (e) => {
    e.preventDefault();
    // Check that a username AND password have been provided
    if (username.length === 0 || password.length === 0) {
      setErrorMessage("Please provide a username and a password.");
      return;
    }
    const postObj = {username, password};
    axios.post("/login", postObj)
    .then(response => {
      if (response.data.status === 401) {
        setErrorMessage("Incorrect username or password.");
        return;
      }
      // Update state and create client cookie with authentication details
      setState({
        ...state,
        username: response.data.username,
        userId: response.data.id
      })
      setCookie("userInfo", {username: response.data.username, userId: response.data.id}, {path: "/"})
      // Redirect user after successfully logging in
      history.push("/dashboard");
    })
    .catch(err => {
      console.log("ERROR", err)
    })
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {errorMessage.length > 0 && (
            <Typography variant="body2" color="error">{errorMessage}</Typography>
          )}
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => onSubmit(e)}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
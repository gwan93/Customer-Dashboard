import { TextField, Button, Avatar, CssBaseline, Link, Grid, Typography, Container } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';

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
  const [username, setUsername] = useState("Alice");
  const [password, setPassword] = useState("alice");
  const [errorMessage, setErrorMessage] = useState(""); // Provide user feedback on unsuccessful login
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    // Check that a username AND password have been provided
    if (username.length === 0 || password.length === 0) {
      setErrorMessage("Please provide a username and a password.");
      setIsLoggingIn(false);
      return;
    }
    const postObj = {username, password};
    axios.post(`${process.env.REACT_APP_API_URL}/login`, postObj)
    .then(response => {
      setIsLoggingIn(true)
      if (!response.data.username || response.data.status === 401) {
        setErrorMessage("Incorrect username or password.");
        setIsLoggingIn(false);
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
            <Typography variant="body2" color="error" data-testid="errorMessage">{errorMessage}</Typography>
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
              inputProps={{ "data-testid": "username" }}
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
              inputProps={{ "data-testid": "password" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => onSubmit(e)}
              data-testid="login"
            >
              {isLoggingIn ? "Logging in. Please wait." : "Login"}
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

Login.propTypes = {
  state: PropTypes.shape({
    username: PropTypes.string,
    userId: PropTypes.oneOfType([ PropTypes.bool, PropTypes.number ])
  }).isRequired,
  setState: PropTypes.func.isRequired,
  setCookie: PropTypes.func.isRequired
}
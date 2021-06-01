import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  },
  currentUser: {
    padding: '0 0.8em 0 0.8em',
    color: 'white'
  }
}));

export default function Navbar(props) {
  const { state } = props;
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title}>
            <Link className={classes.link} to="/">GW Dashboards </Link>
          </Typography>
          {state.username && (
            <>
              <Typography className={classes.currentUser}>
                {state.username}
              </Typography>
              <Typography>
                <Link className={classes.link} to="/dashboard">Dashboard </Link>
              </Typography>
            </>
          )}
          
          {!state.username && (
            <Typography>
              <Link className={classes.link} to="/login">Login </Link>
            </Typography>
          )}

        </Toolbar>
      </AppBar>
    </div>
  )
}
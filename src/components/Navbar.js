import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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
  }
}));

export default function Navbar(props) {
  const { state } = props;
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title}>
            <Link className={classes.link} to="/">Home </Link>
          </Typography>
          <Typography>
            {state.username && <Link className={classes.link} to="/dashboard">Dashboard </Link>}
          </Typography>
          
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
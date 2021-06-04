import { useEffect, useState } from 'react';
import axios from 'axios';
import Customers from './Customers';
import AddCustomer from './AddCustomer';
import Logout from './Logout';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Drawer, List, Typography, Divider, IconButton, Container, Grid, Paper } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { mainListItems, secondaryListItems } from './ListItems';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  // appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  logoutButton: {
    display: 'flex',
    flex: 1,
    alignItems: 'center'
  },
  error: {
    height: 20
  }
}));


export default function Dashboard(props) {
  const { state, setState, removeCookie } = props;
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [profession, setProfession] = useState("");
  const [customers, setCustomers] = useState([]);
  const [myCustomers, setMyCustomers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    // Retrieve customers data when component is mounted
    // Using a post request because the state object will be used on the backend
    // to check if the user is logged in
    // Axios.get does not allow objects to be sent, so post is used instead
    axios.post(`${process.env.REACT_APP_API_URL}/customers`, {state})
    .then(res => {
      setCustomers(res.data.sort((a,b) => a.id - b.id));
      const customersCreatedByMe = res.data.filter(customer => customer.created_by === state.username)
      setMyCustomers(customersCreatedByMe);
    })

    // Cleanup if Dashboard is unmounted before the above async request completes
    return () => {
      setCustomers([]);
    }
  }, [state])

  // Handlers to open and closer Drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const onSubmit = (e) => {
    e.preventDefault();
    const createdBy = state.userId;
    // Check that all fields are filled out
    if (!createdBy || !first || !last || !profession) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }
    const postObj = {createdBy, first, last, profession, state};
    axios.post(`${process.env.REACT_APP_API_URL}/customers/new`, postObj)
    .then(res => {
      if (res.status === 200) {
        // res.data will come back with a key "created_by" with a value of integer. Replace that with username.
        const replaceCreatedBy = {...res.data, created_by: state.username}
        setCustomers([...customers, replaceCreatedBy]);
        setMyCustomers(myCustomers.concat([replaceCreatedBy]));
        // Clear all fields
        setFirst("");
        setLast("");
        setProfession("");
        setErrorMessage("");
      }
    })
    .catch(err => {
      console.log("ERROR!", err)
    })
  }

  const onDelete = (e, id) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/customers/delete`, {id, state})
    .then(res => {
      if (res.status === 200) {
        const filteredCustomers = [...customers].filter(customer => customer.id !== res.data.id);
        const filteredMyCustomers = [...myCustomers].filter(customer => customer.id !== res.data.id);
        setCustomers(filteredCustomers);
        setMyCustomers(filteredMyCustomers);
      }
    })
    .catch(err => console.log("ERROR!", err))
  }

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            {!open && (
              <IconButton
                onClick={handleDrawerOpen}
              >
                <ChevronRightIcon />
              </IconButton>
            )}
            {open && (
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            )}
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main>
          {/* <div className={classes.appBarSpacer} /> */}
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Welcome */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>Dashboard</Typography>
                  <Typography component="p" variant="h5">
                    Welcome, {state.username}
                  </Typography>
                  <div className={classes.logoutButton}>
                    <Logout state={state} setState={setState} removeCookie={removeCookie}/>
                  </div>
                </Paper>
              </Grid>
              {/* Create Customer */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <AddCustomer
                    first={first}
                    setFirst={setFirst}
                    last={last}
                    setLast={setLast}
                    profession={profession}
                    setProfession={setProfession}
                    onSubmit={onSubmit}
                  />
                  <Typography variant="body2" color="error" className={classes.error}>
                    {errorMessage.length !== 0 && errorMessage}
                  </Typography>

                </Paper>
              </Grid>
              {/* All Customers */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Customers customers={customers} myCustomers={myCustomers} state={state} onDelete={onDelete}/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  state: PropTypes.shape({
    username: PropTypes.string,
    userId: PropTypes.oneOfType([ PropTypes.bool, PropTypes.number ])
  }).isRequired,
  setState: PropTypes.func.isRequired,
  removeCookie: PropTypes.func.isRequired
}
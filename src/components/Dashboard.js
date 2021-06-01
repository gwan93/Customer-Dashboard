import { useEffect, useState } from 'react';
import axios from 'axios';
import Customers from './Customers';
import AddCustomer from './AddCustomer';
import Logout from './Logout';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Box, Button, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, Link, Badge, Container, Grid, Paper } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './ListItems';
import clsx from 'clsx';
import Deposits from './Deposits';
import Orders from './Orders';
import Title from './Title';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
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
  appBarSpacer: theme.mixins.toolbar,
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
}));


export default function Dashboard(props) {
  const { state, setState, removeCookie } = props;
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [profession, setProfession] = useState("");
  const [customers, setCustomers] = useState([]);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const classes = useStyles();

  useEffect(() => {
    axios.get("/customers")
    .then(res => {
      setCustomers(res.data)
    })

    // Cleanup if Dashboard is unmounted before the above async request completes
    return () => {
      setCustomers([]);
    }
  }, [])

  const toggleAddCustomer = () => {
    setShowAddCustomer(!showAddCustomer)
  }

  const [open, setOpen] = useState(true);
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
    if (!createdBy || !first || !last || !profession) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }
    const postObj = {createdBy, first, last, profession};
    axios.post("/customers", postObj)
    .then(res => {
      if (res.status === 200) {
        setCustomers([...customers, res.data])
        setFirst("");
        setLast("");
        setProfession("");
      }
    })
    .catch(err => {
      console.log("ERROR!", err)
    })
  }

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>Welcome</Typography>
                  <Typography component="p" variant="h4">
                    {state.username}
                  </Typography>
                </Paper>
              </Grid>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  {/* <Chart /> */}
                  <AddCustomer
                    first={first}
                    setFirst={setFirst}
                    last={last}
                    setLast={setLast}
                    profession={profession}
                    setProfession={setProfession}
                    onSubmit={onSubmit}
                  />
                  {errorMessage.length !== 0 && <h6>{errorMessage}</h6>}

                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Customers customers={customers} state={state} />
                </Paper>
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>

      {/* <h1>Dashboard</h1>
      <h2>Welcome, {state.username}</h2>
      <Logout setState={setState} removeCookie={removeCookie}/>
      <div>
        <Button
          variant="outlined"
          onClick={toggleAddCustomer}
          color={showAddCustomer ? "secondary" : "primary"}
          style={{width: 175}}
        >
          {showAddCustomer ? "Close" : "Add Customer"}
        </Button>
      </div>
      {showAddCustomer && (
        <AddCustomer
          first={first}
          setFirst={setFirst}
          last={last}
          setLast={setLast}
          profession={profession}
          setProfession={setProfession}
          onSubmit={onSubmit}
        />
      )} */}
      {/* {errorMessage.length !== 0 && <h6>{errorMessage}</h6>} */}
      {/* <Customers customers={customers} state={state} /> */}
    </div>
  );
}
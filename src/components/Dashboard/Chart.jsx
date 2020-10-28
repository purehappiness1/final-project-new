import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems /*, secondaryListItems */ } from '../Dashboard/listitems';
import { addDeal } from "../../store/actions";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Chart,
  PieSeries,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Legend,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { logOut } from "../../store/actions";
import { ValueScale } from '@devexpress/dx-react-chart';
import { withStyles } from '@material-ui/core/styles';
import { schemeSet1 } from 'd3-scale-chromatic';
import { Palette } from '@devexpress/dx-react-chart';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#64b5f6',
    },
    secondary: {
      main: '#e55757',
    },
  },
});

const salesData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Sales',
      backgroundColor: 'rgba(75,192,192,0.4)',
      height: '50px',
      borderColor: 'rgba(75,192,192,0.4)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [12, 16, 10, 7, 5, 5, 7, 5, 0, 0, 0, 0]
    }
  ]
};

const styles = {
  titleText: {
    textAlign: 'left',
  }
};

const TextComponent = withStyles(styles)(({ classes, ...restProps }) => (
  <Title.Text {...restProps} className={classes.titleText} />
));


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  someColor: {
    height: '300px'
    // backgroundColor: 'green',
    // opacity: '1',
    // position: 'absolute'
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

export default function Statistics() {
  const appointments = useSelector((state) => (state.appointments));
  const date = new Date()
  const current = appointments.filter((item) => item.startDate < date && item.endDate > date)
  const arr = [];
  current.forEach((item) => arr.push(item.title))
  const title = arr.join(', ')
  const dispatch = useDispatch();
  const firstName = useSelector((state) => (state.firstName));
  const lastName = useSelector((state) => (state.lastName));
  const chartData = useSelector((state) => (state.chartData));
  const [openForm, setOpenForm] = React.useState(false);
  const handleClickOpen = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  const handleSave = () => {
    dispatch(addDeal(client.client, status.status))
    setClient(initState);
    setStatus(initState2)
    setOpenForm(false);
    // сохранение новой сделки в state
  }
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const initState = { client: '' }
  const initState2 = { status: '' }
  const [client, setClient] = React.useState(initState);
  const [status, setStatus] = React.useState(initState2);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setClient({ [name]: value });
  };

  const onChangeHandler2 = (event) => {
    const { name, value } = event.target;
    setStatus({ [name]: value });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseIcon = () => {
    setAnchorEl(null);
  };

  const openIcon = Boolean(anchorEl);
  const id = openIcon ? 'simple-popover' : undefined;

  return (
    <ThemeProvider theme={theme}>
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
              {firstName}&nbsp;{lastName}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={current.length} color="secondary" onClick={handleClick}>
                <NotificationsIcon />
              </Badge>
              <Popover
                id={id}
                open={openIcon}
                anchorEl={anchorEl}
                onClose={handleCloseIcon}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Typography className={classes.typography}>{title}</Typography>
              </Popover>
            </IconButton>
          &nbsp;
          <Link color="inherit" href="/homepage" onClick={() => dispatch(logOut())}>
              Logout
      </Link>
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
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={12}>
                <Paper>
                  <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    NEW
      </Button>
                  <Dialog open={openForm} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New deal</DialogTitle>
                    <DialogContent>
                      <form className={classes.form} noValidate
                        name="loginForm">
                        <TextField onChange={onChangeHandler}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="client"

                          type="text"
                          value={client.client}
                          label="Имя клиента"

                          name="client"

                          autoFocus
                        />
                        <TextField onChange={onChangeHandler2}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="status"
                          label="Статус сделки"
                          type="text"
                          value={status.status}
                          id="password"
                          autoComplete="current-password"
                        />
                      </form>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        cancel
          </Button>
                      <Button onClick={handleSave} color="primary">
                        save
          </Button>
                    </DialogActions>
                  </Dialog>
                  <Pie data={chartData} />
                  <Bar data={salesData}/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}

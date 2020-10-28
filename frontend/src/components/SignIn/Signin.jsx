import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { addName } from "../../store/actions";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#64b5f6',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Все права защищены © '}
      <Link color="inherit" href="https://material-ui.com/">
        Beta CRM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundImage: 'url(https://images.unsplash.com/photo-1595101484640-e160ae22099e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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

export default function SignInSide() {
  const history = useHistory();
  const dispatch = useDispatch();
  const initState = {email: ''}
  const initState2 = {password: ''}
  const [email, setEmail] = useState(initState);
  const [password, setPassword] = useState(initState2);
  const classes = useStyles();

  const onChangeHandler = (event) => {
    const {name, value} = event.target;
    setEmail({[name]: value});
  };

  const onChangeHandler2 = (event) => {
    const {name, value} = event.target;
    setPassword({[name]: value});
  };


  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/login", {
      method: 'POST',
      body: JSON.stringify({
        email: email.email,
        password: password.password
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    try {
      const result = await response.json();
      console.log(result)
      if (result) {
        dispatch(addName(result.firstName, result.lastName))
        return history.push('/dashboard');      
      } 
      return window.alert('Введены неверные данные');    
    } catch (err) {
      return window.alert('Ошибка входа');    
    }  
  }

  return (
    <ThemeProvider theme={theme}>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Войти
          </Typography>
          <form className={classes.form} noValidate
          name="loginForm"
          onSubmit={submitHandler}>
            <TextField onChange={onChangeHandler}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              value={email.email}
              label="Email адрес"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField onChange={onChangeHandler2}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              value={password.password}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Запомнить меня"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Войти

            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Забыли пароль?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Ещё нет аккаунта? Зарегистрируйтесь"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
}

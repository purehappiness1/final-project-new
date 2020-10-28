import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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
      {"Все права защищены © "}
      <Link color="inherit" href="https://material-ui.com/">
        Beta CRM
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const history = useHistory();
  const dispatch = useDispatch();
  const initState = { firstName: "" };
  const initState2 = { lastName: "" };
  const initState3 = { email: "" };
  const initState4 = { password: "" };
  const [firstName, setFirstName] = useState(initState);
  const [lastName, setLastName] = useState(initState2);
  const [email, setEmail] = useState(initState3);
  const [password, setPassword] = useState(initState4);
  const classes = useStyles();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFirstName({ [name]: value });
  };

  const onChangeHandler2 = (event) => {
    const { name, value } = event.target;
    setLastName({ [name]: value });
  };

  const onChangeHandler3 = (event) => {
    const { name, value } = event.target;
    setEmail({ [name]: value });
  };

  const onChangeHandler4 = (event) => {
    const { name, value } = event.target;
    setPassword({ [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName.firstName,
        lastName: lastName.lastName,
        email: email.email,
        password: password.password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    try {
      const result = await response.text();
      console.log(result);
      if (result === "success") {
        dispatch(addName(firstName.firstName, lastName.lastName))
        return history.push("/dashboard");
      }
      return window.alert("Введены неверные данные");
    } catch (err) {
      return window.alert("Ошибка входа");
    }
  };

  return (
    
<ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Зарегистрироваться
        </Typography>
        <form
          className={classes.form}
          noValidate
          name="signupForm"
          onSubmit={submitHandler}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={onChangeHandler}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                type="text"
                value={firstName.firstName}
                required
                fullWidth
                id="firstName"
                label="Имя"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={onChangeHandler2}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                type="text"
                value={lastName.lastName}
                label="Фамилия"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChangeHandler3}
                variant="outlined"
                required
                fullWidth
                id="email"
                type="email"
                value={email.email}
                label="Email адрес"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChangeHandler4}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                value={password.password}
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Я хочу получать рекламную рассылку по email"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Зарегистрироваться
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Уже есть аккаунт? Войти
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </ThemeProvider>
  );
}

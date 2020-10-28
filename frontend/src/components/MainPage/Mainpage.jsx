import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7eddf2",
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
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  all: {
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
    background: "#eee",
  },
  bannerArea: {
    width: "100%",
    height: "100vh",
    background:
      'url("https://i.picsum.photos/id/668/1300/600.jpg?hmac=oAem65feoKp1r9sTGjO7C_vBeM_XI2j3NuAwgcUd-ug")',
    backgroundSize: "cover",
  },
  contentArea: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    textAlign: "center",
    fontWeight: "bolder",
    color: "black",
  },
  btn: {
    backgroundColor: '#68b0ab'
  },
  text: {
    border: '1px solid grey',
    borderRadius: '5px',
    background: 'white',
    opacity: '.6',
    marginBottom: '20px',
    padding: '10px',
    fontSize: 'smaller',
  },
  h1: {
    fontSize: "60px",
    color: "#68b0ab",
    marginTop: '70px',
    marginBottom: '10px',
  },
  container: {
    width: "70%",
    margin: "50px auto",
    padding: "10px",
  },
  box: {
    width: "100%",
    padding: "50px",
    background: "#fff",
    marginTop: "50px",
    borderRadius: "10px",
    boxShadow: "0 0 10px -3px rgba(0,0,0 .1)",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    width: "60%",
    height: "15px",
    margin: "50px auto",
  },
  content1: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  input: {
    width: "200px",
    height: "30px",
    marginBottom: "15px",
    border: "1px solid",
    borderRadius: "3px",
    margin: "5px",
  },
  button: {
    width: "100px",
    height: "30px",
    marginBottom: "15px",
    border: "1px solid",
    borderRadius: "3px",
    margin: "5px",
    backgroundColor: "#8fc0a9",
  },
}));

export default function Pricing() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <div className={classes.all}>
          <div className={classes.bannerArea}>
            <div className={classes.contentArea}>
              <div className={classes.content}>
                <h1 className={classes.h1}>Ваш бизнес растёт?</h1>
                <div className={classes.text}>
                <h3>Не теряйте клиентов и увеличивайте доход</h3>
                <ul>
                  <li>
                    Новая воронка продаж позволит сохранить и увеличить приток
                    клиентов;
                  </li>
                  <li>
                    Система сама рассчитает абонементы и снимет боль о платежах
                    и долгах;
                  </li>
                  <li>
                    Автоматические SMS и E-mail рассылки повысят посещаемость и
                    выручку;
                  </li>
                  <li>
                    Служба поддержки поможет настроить и адаптировать CRM под
                    вас;
                  </li>
                </ul>
                </div>
                
                <Button
                  href="/register"
                  variant="contained"
                  className={classes.content}
                  className={classes.btn}
                >
                  Register
                </Button>
                <Button
                  href="/signin"
                  variant="contained"
                  className={classes.content}
                  className={classes.btn}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.container}>
            <div className={classes.box}>
              <h3>Воронка продаж</h3>
              <p>
                Задача отдела продаж сделать так, чтобы потенциальные клиенты
                продвигались по воронке слева-направо. Сначала устанавливаем
                первичный контакт; потом прилагаем усилия, чтобы он посетил
                пробное; а конечной целью мы ставим "конверсию" потенциального
                клиента в постоянного ученика. Назначайте ответственного
                менеджера, который будет вести клиента по воронке и отмечайте
                лидов цветами: зеленым — теплых, желтым — сомневающихся, красным
                — вероятные отказы.
              </p>
              <img
                src="https://alfacrm.pro/images/screenshots/other/6.png"
                width="950"
                height="600px"
              />
            </div>
          </div>

          <div className={classes.container}>
            <div className={classes.box}>
              <h3>Поддержка и помощь на всех этапах</h3>
              <p>
                BetaCRM — одна из самых дружелюбных CRM для внедрения: на каждом
                этапе вам будут помогать наши специалисты из отдела поддержки.
                Мы поможем настроить воронку продаж с интеграциями,
                автоматические и триггерные рассылки, дополнительные поля,
                виджеты онлайн записи, кастомные отчеты и другие важные
                параметры системы. Для обращения в поддержку достаточно написать
                в ЧАТ справа снизу (два облачка). Можно попросить, чтобы вам
                перезвонили, или описать проблему в чате.
              </p>
              <img
                src="https://alfacrm.pro/images/screenshots/other/6.png"
                width="950"
                height="600px"
              />
            </div>
          </div>

          <div className={classes.container}>
            <div className={classes.box}>
              <h3>Интерактивный календарь</h3>
              <p>
                Календарь — основной инструмент работы любого бизнеса. Всё как
                на ладони: занятые и свободные аудитории, клиенты, встречи,
                пробные, отмены, отработки. При беглом взгляде на календарь
                всегда можно понять что у вас сейчас по расписанию.
              </p>
              <img
                src="https://alfacrm.pro/images/screenshots/calendar/3.png"
                width="950"
                height="600px"
              />
            </div>
          </div>

          <div className={classes.container}>
            </div>
          </div>

        <div className={classes.contentContainer}>
          
          <div className="content2">
            <ul class="list-inline">
              <li>
                <a href="#">Главная</a>
              </li>
              <li>
                <a href="#">Партнеры</a>
              </li>
              <li>
                <a href="#">Тарифы</a>
              </li>
              <li>
                <a href="#">Интеграции</a>
              </li>
            </ul>
          </div>
          <div className={classes.content3}>
            <h5>Подписка на наши новости</h5>
            <input
              className={classes.input}
              type="text"
              placeholder="Введите Ваш email"
            />
            <button className={classes.button}>Подписаться</button>
          </div>
        </div>
      </React.Fragment>
    </ThemeProvider>
  );
}

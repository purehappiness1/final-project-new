require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const session = require("express-session");
const passport = require("passport");
const passportSession = require("passport-session");
const LocalStrategy = require("passport-local").Strategy;
const sha256 = require("sha256");
const User = require("./models/user");
// const mailer = require("./routes/nodemailer");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// mongoose.connect('mongodb://localhost:27017/myproject', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });


mongoose.connect(process.env.CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// mongoose
//     .connect('mongodb://127.0.0.1:27017/myproject', { 
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     })
//     .catch(e => {
//         console.error('Connection error', e.message)
//     })

// mongoose.connect(process.env.CONNECTION, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

const cors = require("cors");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(
  session({ secret: "some key", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static(path.resolve('../frontend/build')))
app.use(cors());

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      console.log(email);
      console.log(password);
      await User.findOne({ email }, async function (err, user) {
        if (err) {
          console.log(err)
          return done(err);
        }
        if (user) {
          console.log("User already exists");
          return done(null, false);
        }
        const newUser = new User();
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.password = sha256(password);
        newUser.email = email;
        newUser.save();
        console.log(newUser)

        // отправка письма на почту пользователя
        // const message = {
        //   to: req.body.email,
        //   subject: "Successfuly done!",
        //   text: `Done! You created an acount on our perfect CRM system
        //           Данные вашей учетки:
        //           firstName: ${req.body.firstName}
        //           lastName: ${req.body.lastName}
        //           Пароль: ${req.body.password}
        //           Данное письмо не требует ответа`,};
        // mailer(message);
        console.log("User Registration successful");
        return done(null, newUser);
      });
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (username, password, done) {
      const passwordHash = sha256(password);
      try {
        const user = await User.findOne({ email: username });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        if (user.password !== passwordHash) {
          return done(null, false, { message: "Wrong password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

function authenticationMiddleware() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.auth = true;
      return next();
    }
  };
}

app.get("/", authenticationMiddleware(), function (req, res) {
  res.render("index");
});

// app.get("*", (req, res) => {
// res.sendFile(path.resolve('../frontend/build/index.html'))
// })

app.post("/signup", function (req, res, next) {
  console.log(req.body);
  passport.authenticate("signup", function (err, user, info) {
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!user) {
      console.log("failed to signup")
      return res.send("failed to signup");
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log("new err")
        return next(err);
      }
      console.log('success')
      return res.send("success");
    });
  })(req, res, next);
});

app.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send("failed to login");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      console.log(user);
      return res.json(user);
    });
  })(req, res, next);
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.listen(process.env.PORT || 9000, () => {
  console.log("Server started");
});

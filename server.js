const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "your secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

const user = {
  userId: 1,
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "johndoe",
};

app.get("/", (req, res) => {
  res.render("home", { user });
});

app.get("/login", (req, res) => {
  res.render("login", { error: req.flash("error") }, { user });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === user.email && password === user.password) {
    res.redirect("/profile");
  } else {
    res.render("login", { user, error: "Invalid credentials" });
  }
});

app.get("/profile", (req, res) => {
  res.render("profile", { user });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

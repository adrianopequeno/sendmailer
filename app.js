const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth:{
      api_key: "Key SendGrid you",
    }
}));

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
  res.render("login", {
    pageTitle: "Login",
  })
})

app.post("/login", (req, res, next) => {
  console.log(req.body.email);
  console.log(req.body.password);
  console.log(req.body.confirmPassword);
  
  res.redirect("/");

  // envio de e-mail de boas vindas
  return transporter.sendMail({
    to: req.body.email,
    from: "you email contact here!",
    subject: "Login feito com sucesso!",
    html: "<h1>Você realizou o login com sucesso!</h1>",
  })

})

app.listen(8000, () => {
  console.log("Sever Started!")
})
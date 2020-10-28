const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'postmaster@sandboxd8f32c573e004c298ccced705077958c.mailgun.org',
    pass: '9bed0bf234e3f9aa27ba88fac7dc7edd-07e45e2a-a171352a'
  }
}, {
  from: 'Mailer admin <postmaster@sandboxd8f32c573e004c298ccced705077958c.mailgun.org>'
})

const mailer = message => {
  transporter.sendMail(message, (err, info) => {
    if(err) return console.log(err);
    console.log('Email sent: ', info);
  });
}

module.exports = mailer;

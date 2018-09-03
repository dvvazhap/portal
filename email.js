let nodemailer = require('nodemailer');
let logger = require('./log/logModule');
let config = require('./config')

exports.sendVerificationMail = function (email, token, r, user_type) {
  let content = "<b>Welcome " + email + " !!!</b>" +
    "<p>Please <a target='_blank' href='" + config.email.host + "verifyUser?t=" + token + "&r=" + r + "'> <b>Click here </b></a> to verify your account.</p>"
  let transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: {
      user: config.email.user,
      pass: config.email.pass
    }
  });

  let mailOptions = {
    from: 'info.werthere4u@gmail.com',
    to: email,
    subject: 'Verification Email for weRThere4U Portal.',
    html: content
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      // console.log(error);
      logger.log("error", "Error in sending verification email", error.sqlMessage);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}


exports.resetPasswordLink = function (email, r) {
  let content = "<b>Hello " + email + " !!!</b>" +
    "<p>Please <a target='_blank' href='" + config.email.host + "resetPassword?e=" + email + "&r=" + r + "'> <b>Click here </b></a> to reset your password.</p>"
  let transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: {
      user: config.email.user,
      pass: config.email.pass
    }
  });

  let mailOptions = {
    from: 'info.werthere4u@gmail.com',
    to: email,
    subject: 'Reset Password for weRThere4U Portal.',
    html: content
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      // console.log(error);
      logger.log("error", "Error in sending password reset email", error.sqlMessage);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}




let nodemailer = require('nodemailer');
let logger = require('./log/logModule');
let config = require('./config')

exports.sendVerificationMail = function (name,email, token, r, user_type) {
  let nam = name.toLowerCase();
  nam = nam.charAt(0).toUpperCase() + nam.slice(1);
  let content = "<html><body style='color:black;font-size:15px;'><h2>Welcome "+ nam +" !!!</h2>" +
  "<p>Good to see you here...<br/>Before we begin, we wanted to make sure that you are a genuine user. <a target='_blank' href='" + config.email.host + "verifyUser?t=" + token + "&r=" + r + "'> <b>Click here </b></a> to verify your account.</p><br>"+
  "<p> These are the features available for you from our side as of now: </p>";
  
  if(user_type == 1){
    content += "<h3>As a Recruiter:</h3> <p style='margin-left:15px;'><i>1. Share your Recruiter Profile <br/>2. Add and Modify job requirements<br/>3. Find Candidates and Filter them<br/>4. Share your job with an URL</i></p>";
  }
  else if(user_type == 2){
    content += "<h3>As an Employee: </h3> <p style='margin-left:15px;'><i>1. Update your personal skills<br/>2. Look for job openings available<br/>3. Share your resume with an URL to others</i></p>";
  }
  else if(user_type == 3){
    content += "<h3>As an Admin: </h3> <p style='margin-left:15px;'><i>1. Look at all the employers and employees information<br/>2. Send Email in Bulk to people</i></p>";
  }
  content+="<p>We also look forward to your valuable feedback (reply to this email or from <b><i>Feedback</i></b> section inside the portal) so that we can add those features to you at the earliest. Also share this portal with all your friends and family.</p>";
  
  content+="</body></html>";
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


exports.resetPasswordLink = function (name, email, r) {
  let nam = name.toLowerCase();
  nam = nam.charAt(0).toUpperCase() + nam.slice(1);

  let content = "<html><body style='color:black;font-size:15px;'><h2>Hello " + nam + " !!!</h2>" +
    "<p><i>Awww !!! You forgot your password ? :( </i><br/>No issues. We are there to help you... </p>"+
    "<p><a target='_blank' href='" + config.email.host + "resetPassword?e=" + email + "&r=" + r + "'> <b>Click here </b></a> to reset your password.</p>" +
    "</body></html>";
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




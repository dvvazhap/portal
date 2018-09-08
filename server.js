let http = require('http');
let url = require('url');
let path = require('path');
let logger = require('./log/logModule');
let con = require('./db');
let authentication = require('./authentication');
let operations = require('./operations');
let express = require('express')
let app = express()
let bodyParser = require('body-parser');
app.disable('x-powered-by');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE");
  res.header('Access-Control-Allow-Headers', "Content-Type");
  next();
})

try {
  // connection.createConnection();
  let q, action, qdata;
  app
    // authentication services
    .get('/validateUser', function (req, res) {
      q = url.parse(req.url, true);
      qdata = q.query;
      authentication.validateUser(qdata.email, req, res);
    })
    .post('/verifyUser', function (req, res) {
      authentication.verifyUser(req.body, res);
    })
    .post('/resetPasswordLink', function (req, res) {
      authentication.resetPasswordLink(req.body, res);
    })
    .post('/resetPassword', function (req, res) {
      authentication.resetPassword(req.body, res);
    })
    .post('/checkUser', function (req, res) {
      authentication.checkUser(req.body, res);
    })
    .post('/addUser', function (req, res) {
      authentication.addUser(req.body, res);
    })
    .post('/resendEmail', function (req, res) {
      authentication.resendEmail(req.body, res);
    })
    .post('/getUserInfo', function (req, res) {
      authentication.getUserInfo(req.body, res);
    })
    .post('/changePassword', function (req, res) {
      authentication.changePassword(req.body, res);
    })
    // operations services
    .post('/postRequirements', function (req, res) {
      operations.postRequirements(req.body, res);
    })
    .post('/getCandidates', function (req, res) {
      operations.getCandidates(req.body, res);
    })
    .post('/setEmployerInfo', function (req, res) {
      operations.setEmployerInfo(req.body, res);
    })
    .post('/getEmployerInfo', function (req, res) {
      operations.getEmployerInfo(req.body, res);
    })
    .post('/setEmployeeInfo', function (req, res) {
      operations.setEmployeeInfo(req.body, res);
    })
    .post('/getEmployeeInfo', function (req, res) {
      operations.getEmployeeInfo(req.body, res);
    })
    .post('/getOpenings', function (req, res) {
      operations.getOpenings(req.body,res);
    })
    .post('/deleteRequirement', function (req, res) {
      operations.deleteRequirement(req.body, res);
    })
    .post('/submitFeedback', function (req, res) {
      operations.submitFeedback(req.body, res);
    })
    .post('/updateRequirement', function (req, res) {
      operations.updateRequirement(req.body, res);
    })
    .post('/getSuperTables', function (req, res) {
      operations.getSuperTables(req.body,res);
    })
    .post('/getSuperSql', function (req, res) {
      operations.getSuperSql(req.body,res);
    });
}
catch (e) {
  logger.log("error", "Error inside catch block :" + e);
}

app.listen(3003)

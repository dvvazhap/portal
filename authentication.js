let email = require('./email');
let logger = require('./log/logModule');
var con = require('./db');

exports.validateUser = function (email, req, res) {
    let sql = "select token, v_profile from users where email = '" + email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'";
    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in validateEmail", error.sqlMessage);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            if (result.length == 0) {
                res.status(200).send("nodata");
            } else {
                if (result[0].v_profile != 1) {
                    res.status(200).send("not_valid");
                } else {
                    res.status(200).send("valid");
                }
            }
        }
    });
}

exports.verifyUser = function (body, res) {
    let sql = "SELECT v_profile from users where token = '" + body.token.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "' AND email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'";
    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in verifyUser", error.sqlMessage);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            if (result && result[0] && result[0].v_profile && result[0].v_profile == 1) res.status(200).send("verified");
            else {
                let sql1 = "UPDATE users SET v_profile=1 where token = '" + body.token.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "' AND v_profile = '" + body.code + "' AND email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'";
                con.query(sql1, (error1, result1, field1) => {
                    if (error1) {
                        logger.log("error", "Error in verifyUser", error1.sqlMessage);
                        res.status(500).send(error1.sqlMessage);
                    } else if (result1) {
                        res.status(200).send(result1.changedRows.toString());
                    }
                });
            }
        }
    });
}

exports.resetPasswordLink = function (body, res) {
    let r = Math.floor(Math.random(1, 1000000000) * 5345354346) % 1000000000;
    let sql1 = "UPDATE users SET reset_code = " + r + " where email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'";
    con.query(sql1, (error1, result1, field1) => {
        if (error1) {
            logger.log("error", "Error in resetPasswordLink", error1.sqlMessage);
            res.status(500).send(error1.sqlMessage);
        } else if (result1) {
            let sql2 = "SELECT name FROM users WHERE email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'";
            let name = body.email;
            con.query(sql2, (error2, result2, field2) => {
                if (error2) {
                    logger.log("error", "Error in fetching name - resetPasswordLink", error2.sqlMessage);
                    res.status(500).send(error2.sqlMessage);
                }
                else if (result2) {
                    name = result2[0].name;
                }
                email.resetPasswordLink(name, body.email, r);
                res.status(200).send(result1.changedRows.toString());
            })

        }
    });
}

exports.resetPassword = function (body, res) {
    let sql = "SELECT reset_code from users where email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'";
    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in resetPassword", error.sqlMessage);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            let r = Math.floor(Math.random(1, 1000000000) * 5345354346) % 1000000000;
            if (result && result[0] && result[0].reset_code && result[0].reset_code == body.code) {
                let sql1 = "UPDATE users SET password='" + body.password + "',reset_code='" + r + "' where email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'";
                con.query(sql1, (error1, result1, field1) => {
                    if (error1) {
                        logger.log("error", "Error in resetPassword", error1.sqlMessage);
                        res.status(500).send(error1.sqlMessage);
                    } else if (result1) {
                        res.status(200).send(result1.changedRows.toString());
                    }
                });
            }
            else {
                res.status(200).send("mismatch");
            }
        }
    });
}

exports.checkUser = function (body, res) {
    let sql = "SELECT token,user_type,v_profile, COUNT(`email`) AS count from `users` where email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "' AND password='" + body.password + "'";

    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in checkUser", error.sqlMessage);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            let obj = { count: result[0].count, token: result[0].token, user_type: result[0].user_type, v_profile: result[0].v_profile }
            res.status(200).send(obj);
        }
    });
}

exports.addUser = function (body, res) {
    let r = Math.floor(Math.random(1, 1000000000) * 5345354346) % 1000000000;
    let data = { token: body.token.replace(/\\/g,'\\\\').replace(/'/g, "\\'"), password: body.password, email: body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'"), 
    user_type: body.user_type, v_profile: r, name: body.name.replace(/\\/g,'\\\\').replace(/'/g, "\\'") };
    // console.log("data",data);
    con.query("INSERT INTO `users` SET ? ", data, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in adding user:", error.sqlMessage);
            res.status(500).end(error.sqlMessage);
        }
        else if (result) {
            email.sendVerificationMail(body.name, body.email, body.token, r, body.user_type);
            if (body.user_type == 1) { //employer
                let a = { name: body.name.replace(/\\/g,'\\\\').replace(/'/g, "\\'"), email: body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'"), designation: "", org_name: "", city: "", phone: "" };
                con.query("INSERT INTO `employerinfo` SET ? ", a, (error1, result1, field1) => {
                    if (error1) {
                        logger.log("error", "Error in adding entry to EMPLOYERINFO table", error1);
                        res.status(500).end(error1.sqlMessage);
                    } else if (result1) {
                        if (result1.affectedRows.toString() == "1")
                            res.status(200).end("insert");
                    }
                });
            }
            if (body.user_type == 2) { //employee
                let a = {
                    name: body.name.replace(/\\/g,'\\\\').replace(/'/g, "\\'"), email: body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'"), phone: "", looking: 0, fullTime: 1, partTime: 0, intern: 0, designation: "", fut_location: "", experience: 0,
                    noticePeriod: 0, skills: "", specificReq: "", gender: 'Male', viewers: 1, objective: "", languages: "", academic_ach: "", extra_curricular: "", certifications: "", hobbies: "", address: "", linkedin: ""
                };
                con.query("INSERT INTO `skills` SET ? ", a, (error1, result1, field1) => {
                    if (error1) {
                        logger.log("error", "Error in adding entry to SKILLS table", error1);
                        console.log("error :",error1)
                        res.status(500).end(error1.sqlMessage);
                    } else if (result1) {
                        if (result1.affectedRows.toString() == "1")
                            res.status(200).end("insert");
                    }
                });
            }
        }
    });
}

exports.resendEmail = function (body, res) {
    let sql = "SELECT v_profile,token,user_type,name from users where email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'";
    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in resendEmail", error.sqlMessage);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            email.sendVerificationMail(result[0].name, body.email, result[0].token, result[0].v_profile, result[0].user_type);
            res.status(200).send("send");
        }
    });
}

exports.getUserInfo = function (body, res) {
    let sql = "SELECT email,v_profile,user_type, validity from users where email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "' AND user_type='" + body.user_type + "' AND token ='" + body.token.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'";

    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in getUserInfo", error.sqlMessage);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            res.status(200).send(result[0]);
        }
    });
}

exports.changePassword = function (body, res) {
    let sql = "UPDATE `users` SET password='" + body.new_password + "' where token = '" + body.token.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "' AND password = '" + body.old_password + "'";

    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in changePassword", error.sqlMessage);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            res.status(200).send(result.changedRows.toString());
        }
    });
}
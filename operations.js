var con = require('./db');
let email = require('./email');
let logger = require('./log/logModule');

/* employerinfo table */
exports.getEmployerInfo = function (body, res) {
    let sql = "SELECT * from employerinfo where email = '" + body.email + "'";

    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in getEmployerInfo", error.sqlMessage);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            res.status(200).send(result[0]);
        }
    });
}
exports.setEmployerInfo = function (body, res) {
    let sql = "UPDATE `employerinfo` SET name='" + body.name + "',designation='" + body.designation + "',org_name='" + body.org_name + "',city='" + body.city + "',phone='" + body.phone + "' where email = '" + body.email + "'";

    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in checkUser", error.sqlMessage);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            res.status(200).send(result.changedRows.toString());
        }
    });
}

/* openings table*/
exports.getOpenings = function (body,res) {
    let sql = "SELECT * FROM openings ";
    if(body.email == "" && body.ind == "") sql+= "ORDER BY timestamp DESC";
    else if(body.email != "" && body.ind == "") sql+= "where email = '" + body.email + "' ORDER BY timestamp DESC";
    else if(body.email == "" && body.ind != "") sql+= "where ind = '" + body.ind + "' ORDER BY timestamp DESC";
    else{res.status(500).send("Trying to hack huh !!! Hard luck buddy");}
    
    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in getOpenings", error);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            if(result.length == 0) res.status(200).send('0');
            else res.status(200).send(result);
        }
    });
}
exports.postRequirements = function (body, res) {
    let data = JSON.parse(body.obj);
    con.query("INSERT INTO `openings` SET ? ", data, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in postRequirements", error);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            res.status(200).send(result.affectedRows.toString());
        }
    });
}
exports.updateRequirement = function (body, res) {
    let data = JSON.parse(body.obj);
    let sql = "UPDATE `openings` SET email = '" + data.email + "', fullTime= '" + data.fullTime + "', partTime= '" + data.partTime + "', intern = '" + data.intern + "', designation= '" + data.designation + "', company= '" + data.company + "', location= '" + data.location + "', contact= '" + data.contact + "',	min_years = '" + data.min_years + "',max_years = '" + data.max_years + "', skills= '" + data.skills + "', specificReq= '" + data.specificReq + "', noticePeriod= '" + data.noticePeriod + "', gender= '" + data.gender + "', count= '" + data.count + "' WHERE ind = '" + data.ind + "'";
    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in updateRequirement", error);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            res.status(200).send(result.changedRows.toString());
        }
    });
}
exports.deleteRequirement = function (body, res) {
    con.query("DELETE FROM `openings` WHERE ind ='" + body.job_id + "'", (error, result, field) => {
        if (error) {
            logger.log("error", "Error in submitFeedback:", error.sqlMessage);
            res.status(500).end(error.sqlMessage);
        }
        else if (result) {
            res.status(200).end(result.affectedRows.toString());
        }
    });
}

/* skills table*/
exports.getCandidates = function (body, res) {
    let sql = "SELECT * FROM skills WHERE looking = '1' AND LOWER(company) NOT LIKE '%" + body.org_name.toLowerCase() + "%'";
    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in getCandidates", error);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            res.status(200).send(result);
        }
    });
}
exports.getEmployeeInfo = function (body, res) {
    let sql = "SELECT * from skills where email = '" + body.email + "'";

    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in getEmployeeInfo", error.sqlMessage);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            res.status(200).send(result[0]);
        }
    });
}

exports.setEmployeeInfo = function (body, res) {
    let data = JSON.parse(body.obj);
    con.query("UPDATE`skills` SET name='" + data.name + "',phone = '" + data.phone + "', looking='" + data.looking + "', fullTime='" + data.fullTime +
     "', partTime='" + data.partTime + "', intern='" + data.intern + "', designation='" + data.designation + "', company='" + data.company +
      "', cur_location='" + data.cur_location + "', fut_location='" + data.fut_location + "', experience='" + data.experience +
       "', noticePeriod='" + data.noticePeriod + "', degree='" + data.degree + "', stream='" + data.stream + "', institution='" + data.institution + 
       "', passout='" + data.passout + "', skills='" + data.skills + "', specificReq='" + data.specificReq +"', gender='" + data.gender + "' where email = '" + body.email + "'", (error, result, field) => {
        if (error) {
            logger.log("error", "Error in setEmployeeInfo", error);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            res.status(200).send(result.changedRows.toString());
        }
    });
}

/* feedback table */
exports.submitFeedback = function (body, res) {
    let data = { email: body.email, profile: body.profile, subject: body.subject };
    // console.log("data",data);
    con.query("INSERT INTO `feedback` SET ? ", data, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in submitFeedback:", error.sqlMessage);
            res.status(500).end(error.sqlMessage);
        }
        else if (result) {
            res.status(200).end("insert");
        }
    });
}


/* All tables */
exports.getSuperTables = function (body, res) {
    let sql ="";
    if(body.email == ""){
        sql = "SELECT * FROM "+body.tableName;
    }else{
        sql = "SELECT * FROM "+body.tableName+" WHERE email= '"+body.email+"'";
    }
    
    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in getSuper-"+body.tableName, error);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            res.status(200).send(result);
        }
    });
}

exports.getSuperSql = function (body, res) {
    con.query(body.sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in getSuper-"+body.tableName, error);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            res.status(200).send(result);
        }
    });
}



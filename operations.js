var con = require('./db');
let email = require('./email');
let logger = require('./log/logModule');

/* employerinfo table */
exports.getEmployerInfo = function (body, res) {
    let sql = "SELECT * from employerinfo where email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'";

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
    let sql = "UPDATE `employerinfo` SET name='" + body.name.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "',designation='" + body.designation.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + 
    "',org_name='" + body.org_name.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "',city='" + body.city.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + 
    "',phone='" + body.phone.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "' where email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'";

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
exports.getOpenings = function (body, res) {
    let sql = "SELECT * FROM openings ";
    if (body.email == "" && body.ind == "") sql += "ORDER BY timestamp DESC";
    else if (body.email != "" && body.ind == "") sql += "where email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "' ORDER BY timestamp DESC";
    else if (body.email == "" && body.ind != "") sql += "where ind = '" + body.ind + "' ORDER BY timestamp DESC";
    else { res.status(500).send("Trying to hack huh !!! Hard luck buddy"); }

    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in getOpenings", error);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            if (result.length == 0) res.status(200).send('0');
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
    let sql = "UPDATE `openings` SET email = '" + data.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "', fullTime= '" + data.fullTime + "', partTime= '" + data.partTime + "', intern = '" + data.intern + 
    "', designation= '" + data.designation.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "', company= '" + data.company.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + 
    "', location= '" + data.location.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "', contact= '" + data.contact.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "',min_years = '" + data.min_years + 
    "',max_years = '" + data.max_years + "', skills= '" + data.skills.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "', specificReq= '" + data.specificReq.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + 
    "', description= '" + data.description.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "', gender= '" + data.gender + "', count= '" + data.count + "' WHERE ind = '" + data.ind + "'";
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
    let sql = "SELECT * FROM skills WHERE looking = '1'";
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
    let sql = "SELECT * from skills where email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'";

    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in getEmployeeInfo", error.sqlMessage);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            if (result.length > 0) {
                result[0].education = [];
                result[0].work_experience = [];
                result[0].projects = [];
            }
            res.status(200).send(result[0]);
        }
    });
}

exports.setEmployeeInfo = function (body, res) {
    let data = JSON.parse(body.obj);
    let sql = "UPDATE`skills` SET name='" + data.name.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "',phone = '" + data.phone.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + 
    "', looking='" + data.looking + "', fullTime='" + data.fullTime + "', partTime='" + data.partTime + "', intern='" + data.intern +
    "', designation='" + data.designation.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "', fut_location='" + data.fut_location.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + 
    "', experience='" + data.experience + "', noticePeriod='" + data.noticePeriod + "', skills='" + data.skills.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + 
    "', specificReq='" + data.specificReq.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "', gender='" + data.gender +
    "', objective='" + data.objective.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "', languages='" + data.languages.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + 
    "', academic_ach='" + data.academic_ach.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "', extra_curricular='" + data.extra_curricular.replace(/\\/g,'\\\\').replace(/'/g, "\\'") +
    "', certifications='" + data.certifications.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "', hobbies='" + data.hobbies.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + 
    "', address='" + data.address.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "', linkedin='" + data.linkedin.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + 
    "' where email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'";
    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in setEmployeeInfo", error);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            res.status(200).send(result.changedRows.toString());
        }
    });
}

exports.addEducation = function (body, res) {
    con.query("SELECT MAX(ind) as max FROM `education` WHERE email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'", (error, result, field) => {
        if (error) {
            logger.log("error", "Error in adding education table count", error);
            res.status(500).end(error.sqlMessage);
        } else if (result) {
            let max = result[0].max + 1
            let data = { email: body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'"), ind: max, college: '', degree: '', stream: '', start: '', end: '', cgpa: 0, percentage: 0 };
            con.query("INSERT INTO `education` SET ? ", data, (error1, result1, field) => {
                if (error1) {
                    logger.log("error", "Error in inserting education table", error1.sqlMessage);
                    res.status(500).end(error1.sqlMessage);
                }
                else if (result1) {
                    res.status(200).send("" + max);
                }
            });
        }
    });
}
exports.getEducation = function (body, res) {
    let sql = "SELECT * from education where email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "' ORDER BY end DESC";
    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in get Education table data", error.sqlMessage);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            res.status(200).send(result);
        }
    });
}

exports.updateEducation = function (body, res) {
    let sql = "UPDATE `education` SET " +
        "college='" + body.college.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "', degree ='" + body.degree.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + 
        "', stream ='" + body.stream.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "', start ='" + body.start +
         "', end ='" + body.end + "', cgpa ='" + body.cgpa + "', percentage ='" + body.percentage +
        "' WHERE ind ='" + body.ind + "' AND email='" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'";
    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in updateEducation:", error.sqlMessage);
            res.status(500).end(JSON.stringify({ status: 0, updated: 0, msg: error.sqlMessage }));
        }
        else if (result) {
            if (result.affectedRows.toString() == '1')
                res.status(200).end(JSON.stringify({ status: 1, updated: 1, msg: "" }));
            else
                res.status(200).end(JSON.stringify({ status: 1, updated: 0, msg: "" }));
        }
    });
}

exports.deleteEducation = function (body, res) {
    con.query("DELETE FROM `education` WHERE ind ='" + body.ind + "' AND email='" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'", (error, result, field) => {
        if (error) {
            logger.log("error", "Error in deleteEducation:", error.sqlMessage);
            res.status(500).end(error.sqlMessage);
        }
        else if (result) {
            res.status(200).end(result.affectedRows.toString());
        }
    });
}

exports.addWork = function (body, res) {
    con.query("SELECT MAX(ind) as max FROM `work_experience` WHERE email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'", (error, result, field) => {
        if (error) {
            logger.log("error", "Error in adding work_experience table count", error);
            res.status(500).end(error.sqlMessage);
        } else if (result) {
            let max = result[0].max + 1
            let data = { email: body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'"), ind: max, company: '', description: '', start: '', end: '',present: false };
            con.query("INSERT INTO `work_experience` SET ? ", data, (error1, result1, field) => {
                if (error1) {
                    logger.log("error", "Error in inserting work_experience table", error1.sqlMessage);
                    res.status(500).end(error1.sqlMessage);
                }
                else if (result1) {
                    res.status(200).send("" + max);
                }
            });
        }
    });
}

exports.getWork = function (body, res) {
    let sql = "SELECT * from work_experience where email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "' ORDER BY end DESC";
    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in get work_experience table data", error.sqlMessage);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            res.status(200).send(result);
        }
    });
}
exports.updateWork = function (body, res) {
    let sql = "UPDATE `work_experience` SET " +
        "company='" + body.company.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "', description ='" + body.description.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + 
        "', start ='" + body.start + "', end ='" + body.end + "',present =" + body.present + 
        " WHERE ind ='" + body.ind + "' AND email='" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'";
    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in update work_experience:", error.sqlMessage);
            res.status(500).end(JSON.stringify({ status: 0, updated: 0, msg: error.sqlMessage }));
        }
        else if (result) {
            if (result.affectedRows.toString() == '1')
                res.status(200).end(JSON.stringify({ status: 1, updated: 1, msg: "" }));
            else
                res.status(200).end(JSON.stringify({ status: 1, updated: 0, msg: "" }));
        }
    });
}

exports.deleteWork = function (body, res) {
    con.query("DELETE FROM `work_experience` WHERE ind ='" + body.ind + "' AND email='" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'", (error, result, field) => {
        if (error) {
            logger.log("error", "Error in delete work_experience:", error.sqlMessage);
            res.status(500).end(error.sqlMessage);
        }
        else if (result) {
            res.status(200).end(result.affectedRows.toString());
        }
    });
}

exports.addProject = function (body, res) {
    con.query("SELECT MAX(ind) as max FROM `projects` WHERE email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'", (error, result, field) => {
        if (error) {
            logger.log("error", "Error in adding projects table count", error);
            res.status(500).end(error.sqlMessage);
        } else if (result) {
            let max = result[0].max + 1
            let data = { email: body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'"), ind: max, name: '', description: '', skills: '', start: '', end: '' };
            con.query("INSERT INTO `projects` SET ? ", data, (error1, result1, field) => {
                if (error1) {
                    logger.log("error", "Error in inserting projects table", error1.sqlMessage);
                    res.status(500).end(error1.sqlMessage);
                }
                else if (result1) {
                    res.status(200).send("" + max);
                }
            });
        }
    });
}

exports.getProject = function (body, res) {
    let sql = "SELECT * from projects where email = '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "' ORDER BY end DESC";
    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in get projects table data", error.sqlMessage);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            res.status(200).send(result);
        }
    });
}
exports.updateProject = function (body, res) {
    let sql = "UPDATE `projects` SET " +
        "name='" + body.name.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "', description ='" + body.description.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + 
        "', skills ='" + body.skills.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "', start ='" + body.start + "', end ='" + body.end + 
        "' WHERE ind ='" + body.ind + "' AND email='" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'";
    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in update projects:", error.sqlMessage);
            res.status(500).end(JSON.stringify({ status: 0, updated: 0, msg: error.sqlMessage }));
        }
        else if (result) {
            if (result.affectedRows.toString() == '1')
                res.status(200).end(JSON.stringify({ status: 1, updated: 1, msg: "" }));
            else
                res.status(200).end(JSON.stringify({ status: 1, updated: 0, msg: "" }));
        }
    });
}

exports.deleteProject = function (body, res) {
    con.query("DELETE FROM `projects` WHERE ind ='" + body.ind + "' AND email='" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'", (error, result, field) => {
        if (error) {
            logger.log("error", "Error in delete projects:", error.sqlMessage);
            res.status(500).end(error.sqlMessage);
        }
        else if (result) {
            res.status(200).end(result.affectedRows.toString());
        }
    });
}
/* feedback table */
exports.submitFeedback = function (body, res) {
    let data = { email: body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'"), profile: body.profile, subject: body.subject.replace(/\\/g,'\\\\').replace(/'/g, "\\'") };
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
    let sql = "";
    if (body.email == "") {
        sql = "SELECT * FROM " + body.tableName;
    } else {
        sql = "SELECT * FROM " + body.tableName + " WHERE email= '" + body.email.replace(/\\/g,'\\\\').replace(/'/g, "\\'") + "'";
    }

    con.query(sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in getSuper-" + body.tableName, error);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            res.status(200).send(result);
        }
    });
}

exports.getSuperSql = function (body, res) {
    con.query(body.sql, (error, result, field) => {
        if (error) {
            logger.log("error", "Error in getSuper-" + body.tableName, error);
            res.status(500).send(error.sqlMessage);
        } else if (result) {
            res.status(200).send(result);
        }
    });
}



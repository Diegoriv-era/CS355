const dbConnection = require('../database/connection');

class DepartmentController {

    constructor(){
        console.log("Department Controller Initialized");
    }

    getDepartmentByName(deptName){
        return new Promise((resolve,reject) => {
            //console.log(`this: ${deptName}`);
            const query = 'SELECT * FROM BK_Department WHERE dept_name = ?;'
            dbConnection.query({
                sql: query,
                values: [deptName]
            }, (err, res) =>{
                if(err){
                    reject(err);
                }
                resolve(res);
            });
        });
    }
    addDepartment (dept) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO BK_Department
                (dept_name, building, budget) VALUES
                (?, ?, ?)
            `;

            dbConnection.query(
                {
                    sql: query,
                    values: [dept.name, dept.building, dept.budget]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    //console.log(dept.name);
                    resolve(res);
            });
        });
    }






}
module.exports = DepartmentController;
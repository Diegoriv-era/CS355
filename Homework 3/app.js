const demoController = new (require('./controller/demoController'))();
const studentController = new (require('./controller/studentController'))(); 
const departmentController = new (require('./controller/departmentController'))(); 

async function demo() {
    try {
        let result = await demoController.getDatabases();
        if(result.length > 0) {
            console.log("BK_ Tables Exist");
        }
    } catch (e) {
        console.log(`Your BK_ Tables might be missing!: ${e.sqlMessage}`);
    }
}

async function getStudentRecord(name) {
    try {
        let result = await studentController.getStudentByName(name);
        if(result.length > 0) {
            //console.log("Student Name Exists!!");
        }
        for(let student of result){
            console.log(`Student Record for: ${student.ID} - ${student.name}\n\tDepartment: ${student.dept_name}`);
            
            let deptbuild = await departmentController.getDepartmentByName(student.dept_name);
            for (let buildings of deptbuild){
                console.log(`\tHome Building: ${buildings.building}`)
            }
            console.log(`\tTotal Credits: ${student.tot_cred}`)
            //console.log(`Home building: ${deptbuild.indexOf().building}`);
            
        }
    } catch (e) {
        console.log(`The Student name might be missing!: ${e.sqlMessage}`);
    }
}
async function getDeptName(name) {
    try {
        let result = await departmentController.getDepartmentByName(name);
        if(result.length > 0) {
            //console.log("Dept Name Exists!!");
        }
    } catch (e) {
        console.log(`The Dept name might be missing!: ${e.sqlMessage}`);
    }
}
async function createDepartment(dept) {
    try {
        let result = await departmentController.getDepartmentByName(dept.name);
        //console.log(dept.name);
        if(result.length > 0) {
            for (let val of result){
                console.log(`${val.dept_name} already exists`);
            }
        }
        else {
            let result1 = await departmentController.addDepartment(dept)
            let result2 = await departmentController.getDepartmentByName(dept.name);
            for (let val of result2){
                console.log(val);
            }
        }
    } catch (e) {
        console.log(`The Dept name might be missing!: ${e.sqlMessage}`);
    }
}

(async function main() {
    let input = parseInt(process.argv[2]); // cast to int
    console.log(`Your input was: ${input}`);

    switch (input) {
        case 0:
            // Demo: Check for BK_ Tables in your database
            await demo();
            break;
        case 1:
            // Fetching Data
            let studentName = process.argv[3];
            console.log(`Your argument was: ${studentName}`);
            await getStudentRecord(studentName);
            break;
        case 2:
            // Posting Data
            
            
            let department = JSON.parse(process.argv[3]);
            
            console.log(`Your argument was: ${department}`);
            await createDepartment(department);
            break;

        default:
            console.log("Connection Successful: Welcome to HW3!");
            break;
    }
    process.exit(0);
})();
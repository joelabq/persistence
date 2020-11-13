const Pool = require('pg').Pool
const pool = new Pool({ 
    user: 'admin',
    host: 'localhost',
    database: 'students_db',
    password: 'admin',
    port: 5432,
});

const getStudents = (req,res) => {
    if (!req.query.name){
    pool.query("SELECT * FROM students;", (error, results) => {
        if (error) {
            throw error;
          }
           res.status(200).json(results.rows);

    })}
    else if (req.query.name){
        pool.query(`SELECT * FROM students where name LIKE '%${req.query.name}%';`, (error, results) => {
            if (error) {
                throw error;
              }
               res.status(200).json(results.rows);
    
        })}
}

const getStudentbyID = (req,res) => {
    pool.query(`SELECT * FROM students WHERE id = ${req.params.studentid} ;`, (error, results) => {
        if (error) {
            throw error;
          }
           res.status(200).json(results.rows);
    })
}

const getGradesByStudentID = (req,res) => {
    pool.query(`SELECT students.name,students.email, grades.grade FROM students RIGHT JOIN grades ON students.id = grades.student_id where students.id = ${req.params.studentid} ;`, (error, results) => {
        if (error) {
            throw error;
          }
           res.status(200).json(results.rows);
    })
}

const registerNewStudent = (req,res) => {
    
    pool.query(`INSERT INTO STUDENTS (name,email) VALUES ('${req.body.username}','${req.body.email}');`, (error, results) => {
        if (error) {
            res.status(400).send({message: "Failed to Add user", status: "failed"});
            
          }
          else {
              res.status(200).send({message: "Successfully Added user", status: "success"})
            }
        
    })
}

const postStudentGrade = (req,res) => {
    
    pool.query(`INSERT INTO grades (student_id,grade) VALUES ('${req.body.student_id}','${req.body.grade}');`, (error, results) => {
        if (error) {
            res.status(400).send({message: "Failed to Add grade", status: "failed"});
            
          }
          else {
              res.status(200).send({message: "Successfully Added grade", status: "success"})
            }
        
    })
}

module.exports = {
        getStudents,
        getStudentbyID,
        registerNewStudent,
        getGradesByStudentID,
        postStudentGrade
};
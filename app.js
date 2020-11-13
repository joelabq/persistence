const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const db = require('./queries')

var students = [];


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/student', db.getStudents); 


app.get('/student/:studentid', db.getStudentbyID);

app.get('/grades/:studentid', db.getGradesByStudentID);

app.post('/register', db.registerNewStudent);

app.post('/grades', db.postStudentGrade);

const port = 3000
app.listen(port, () => console.log(`Student App listening at http://localhost:${port}`))
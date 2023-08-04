const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.json());

const students = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
 
];


function authenticate(req, res, next) {
    const { username, password } = req.body;

    const validUsername = 'admin';
    const validPassword = 'password';

    if (username === validUsername && password === validPassword) {
        
        next();
    } else {
      
        res.status(401).send('Authentication failed');
    }
}

app.get('/', (req, res) => {
    res.send('Welcome to Student Management System');
});

app.get('/students', (req, res) => {
    res.render('students', { students });
});

app.get('/edit', authenticate, (req, res) => {
    res.render('edit');
});

app.post('/edit', authenticate, (req, res) => {
    const studentId = req.body.studentId;
    const newName = req.body.newName;

    const studentToUpdate = students.find(student => student.id === parseInt(studentId));

    if (!studentToUpdate) {
        return res.send(`Student with ID ${studentId} not found.`);
    }

    studentToUpdate.name = newName;

    res.send(`Updated student name with ID ${studentId} to ${newName}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

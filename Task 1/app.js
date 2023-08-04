const express = require('express');
const app = express();
const port = 3000; 

app.set('view engine', 'ejs');

app.use(express.json());

const students = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  
];



app.get('/', (req, res) => {
    res.send('Welcome to Student Management System');
});

app.get('/students', (req, res) => {
    res.render('students', { students });
});

app.get('/delete', (req, res) => {
    res.render('delete');
});


app.post('/delete', (req, res) => {
    const studentId = req.body.studentId;
    
    res.send(`Deleted student with ID ${studentId}`);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

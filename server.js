const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/Students')
const cors=require('cors')

const app = express();

app.use(express.json());
app.use(cors())

const mongoURI =  'mongodb://localhost:27017/FieldProject';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.get('/students', async (req, res) => {
    const { rollNo } = req.body;

    try {
        const student = await Student.findOne({ "ROLL NO": rollNo});
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});



app.get('/', async(req,res)=>{
    const z=await Student.find()
    res.send({"payload":z})
});

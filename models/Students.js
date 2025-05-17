const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    "ROLL NO": { type: String, required: true },
    "STUDENT NAME": { type: String, required: true },
    "MAIL ID": { type: String, required: true },
    "STUDENT PH NO": { type: Number, required: true },
    "PARENT PH NO": { type: Number, required: true },
    "Department": {type:String}
});

module.exports = mongoose.model('Student', studentSchema);
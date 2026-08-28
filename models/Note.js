// importing mongoose
const mongoose = require('mongoose')
// Creating the schema variable
const Noteschema = new mongoose.Schema({
    // this is for the notes title and allows both stringand number
    title: { type: [String, Number], required: [true, 'Your Message Title'], trim: true, maxlength: 100 },
    // this isthe content of the note and allows both stringand number
    content: { type: [String, Number], required: [true, 'Your message content'] },
    // This will verify and give reference to the user and owner of the note
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // this will give the created time of the note itis called timestamps
    timestamps: true
})
// this is for exporting it as a mongoose model because an unexported schema is undefined to mongoose
module.exports = mongoose.model('Note', Noteschema)
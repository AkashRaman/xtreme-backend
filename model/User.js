const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    _id: { type: String },
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    contents: [{ title: String, type: String, content: String, date: Date }]
});

module.exports = mongoose.model('User', UsersSchema);
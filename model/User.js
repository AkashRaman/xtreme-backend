const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    contents: [{ title: String, content: String, date: Date }]
});

module.exports = mongoose.model('User', UsersSchema);
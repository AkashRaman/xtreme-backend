const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    email: String,
    password: String,
    contents: [{ title: String, content: String, date: Date }]
});

module.exports = mongoose.model('User', UsersSchema);
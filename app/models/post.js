const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name:{
        type: String
    },
    content:{
        type: String
    },
    date:{
        type: String
    }
});

module.exports = mongoose.model('Post', postSchema);


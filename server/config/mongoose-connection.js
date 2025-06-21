const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGODB_URI}/techMart`)
    .then(() => console.log("MONGODB Connected Successfully!"))
    .catch((err) => console.log("MONGODB Error :: ", err));

module.exports = mongoose.connection;
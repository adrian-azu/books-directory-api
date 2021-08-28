const mongoose = require("mongoose")
const { MONGO_URI } = process.env

mongoose.connect(MONGO_URI,{
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
})
    .then(() => console.log("DB Connected"))
    .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error)
        process.exit(1)
    });
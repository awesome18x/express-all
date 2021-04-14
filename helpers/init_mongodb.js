const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/express-all', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(() => {
    console.log('Connected to mongoosedb');
}).catch((error) => {
    console.log(error);
})
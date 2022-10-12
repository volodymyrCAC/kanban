import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/local", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

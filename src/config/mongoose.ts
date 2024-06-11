import mongoose from "mongoose";
const urlMongo = "mongodb+srv://santiicruzz:1339@cluster0.mzqs3fn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("useFindAndModify",false);
mongoose.connect(urlMongo || process.env.urlMongo,{
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})

export {mongoose};
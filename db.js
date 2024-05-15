 const mongoose=require('mongoose')

 //Define the MongoDb connection URL

 const mongoURL='mongodb://localhost:27017/hotels' //Replace 'mydatabase' with your database name


 //set up MongoDb connnection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDb connection,


const db=mongoose.connection;


//define event listeners for database connection
db.on('connected',()=>{
    console.log('MongoDb connection successful')
})


db.on('error',(err)=>{
    console.log("MongoDb connection error",err);
});

db.on('disconnected',()=>{
    console.log("MongoDb disconnected");
})


//Export the database connection

module.exports=db





// console.log("Aman")

// function add(a,b)
// {
//     return a+b;
// }

// var result=add(2,5);
// console.log(result);



/**********************Callback function */
// function callback() {
//     console.log("From callback");
// }

// function addition(a, b, callback) {
//     var ans = a + b;
//     console.log("Ans is", ans);
//     callback();
// }

// addition(5, 3, callback);



// var fs=require('fs');
// var os=require('os');

// var user=os.userInfo();
// console.log(user.username);
// fs.appendFile('greeting.txt','Hi' + user.username + '\n' ,()=>{
//     console.log("file is created");
// });

/************for import notes.js file in server */

// console.log("calling u from server js or server file")
// const notes=require('./notes.js');


// var age=notes.age;
// console.log(age);
// var result=notes.addNumber(age+10,10);
// console.log("Addition of two number is" ,+result);

/*************Loadash */
// var _ =require('lodash'); //_ ke jagah kuch vhi rakh skte hai

// var data=["person","person",1,2,1,2,'name','age','2']
// var filter=_.uniq(data);
// console.log(filter);

/****************Day -3 Express js tutorial for beginners Rest Api node js express  */
//json to js object
// const jsonString ='{"name":"John","age":38,"city":"New York"}';
// const jsonObject=JSON.parse(jsonString);
// console.log(jsonObject.name);

// //object to json
// const objecttojson =
// {
//     name:"John",
// age:38,
// city:"New York"
// };
// const json=JSON.stringify(objecttojson);
// const parseObject=JSON.parse(json);
// console.log(parseObject.name);

// //type of json string hai
// console.log(typeof json);


/************express install to make server */
// const express=require('express')
// const app=express()

// app.get('/',function(req,res){
//     res.send('Welcome to my hotel... How i can Help You');
// })

// app.get('/chicken',(req,res)=>{
//     res.send('sure sir, i Would love to serve chicken')
// })

// app.get('/idli',(req,res)=>{
//     var customized_idli={
//         name:'rava idli',
//         size:'10 cm diameter',
//         is_sambhar:true,
//         is_chutney:false
//     }
//     res.send(customized_idli)
    

// })

// app.post('/items',(req,res)=>{
//     res.send("data is saved");
// })
// app.listen(3000,()=>{
//     console.log('Listening on port 3000')
// })

/************************CRUD OPERATION START */
// const express = require('express');
// const app = express();
// const db = require('./db'); // Ensure db.js properly connects to MongoDB
// const Person = require('./models/person');
// const MenuItem=require('./models/MenuItem')
// Middleware to parse JSON bodies
// app.use(express.json());

// app.get('/', function(req, res){
//     res.send('Welcome to my hotel... How can I help you?');
// });

// POST route to add a person
// app.post('/person', async (req, res) => {
//     try {
//         const data = req.body;
//         const newPerson = new Person(data); // Create a new Person document using the Mongoose model
//         const response = await newPerson.save(); // Save the new person to the database
//         res.status(200).json(response); // Send back the saved document with 201 status
//     } catch (err) { 
//         console.error('Error saving person:', err); // Log the error
//         res.status(500).send({ error: 'Failed to save person' }); // Send a 500 error response
//     }
// });

// app.listen(3001, () => {
//     console.log('Listening on port 3000');  
// });


// // //Get method to get the person
// app.get('/person', async (req, res) => {
//     try {
//         const data = await Person.find();
//         console.log('data fetched');
//         res.status(200).json(data);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Ensure this is the only app.listen call in your entire server setup
// // app.listen(3001, () => {
// //     console.log('Listening on port 3000');
// // });


/*****************************Menu Item Post and get we use */
/**110 se 116 include ke baad */
// app.post('/MenuItem',async(req,res)=>{
//     try{
//         const data=req.body;
//         const newItem= new MenuItem(data);
//         const response=await newItem.save();
//         res.status(200).json(response);
//     }

//     catch (err) { 
//                 console.error('Error saving person:', err); // Log the error
//                 res.status(500).send({ error: 'Failed to save person' }); // Send a 500 error response
// }
// })

// // app.listen(3001, () => {
//     //     console.log('Listening on port 3000');  
//     // });
    
    
//     //Get method to get the person

// app.get('/MenuItem', async (req, res) => {
//     try {
//         const data = await Person.find();
//         console.log('data fetched');
//         res.status(200).json(data);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.listen(3001, () => {
//         console.log('Listening on port 3000');  
//     });


/**********************NODE JS ROUTING************* */

const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db'); // Ensure db.js properly connects to MongoDB
const MenuItem = require('./models/MenuItem');
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/person/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/taste/:tasteType', async (req, res) => {
    try {
        const taste = req.params.tasteType;
        if (taste === 'spicy' || taste === 'sweet') {
            const response = await MenuItem.find({ taste: taste });
            console.log('Response fetched:', response);
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: 'Invalid taste type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

 const express=require('express');
 const router=express.Router();
 const Person=require('./../models/person');

 router.post('/', async (req, res) => {
    console.log("Received body:", req.body);
    try {
        const newPerson = new Person(req.body);
        const response = await newPerson.save();
        console.log('Data saved:', response);
        res.status(201).json(response);
    } catch (err) {
        console.error("Error saving data:", err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: "Validation Error", details: err.message });
        }
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});


router.get('/',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
 })

router.get('/workType',async(req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=='chef'||workType==='manager'||workType=='waiter')
            {
                const response=await Person.find({work:workType});
                console.log('response fetched');
                res.status(200).json(response);
            }
            else{
                res.status(400).json({error:'Invalid work Type'});
            }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
 })


/***************Update data in Node js */
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true // Run Mongoose validation on update
        });

        if (!response) {
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('Data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});



/**************Delete Data in Node js */

router.delete('/:id',async(req,res)=>{
    try{
const personId=req.params.id;//Extract the person's ID from the URL parameter

//Assuming you have a Person model

const response=await Person.findByIdAndDelete(personId);

if (!response)
    {
        return res.status(404).json({error:'Person not found'});
    }
    console.log('data delete');
    res.status(200).json({message:'person Deleted Successfully'})
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})

 module.exports=router
const express=require('express')
const router=express.Router();
const MenuItem =require('./../models/MenuItem')

//Post Method to add a Menu Item

router.post('/',async(req,res)=>{
    try{
        const data=req.body
        const newMenu=new MenuItem(data);
        const response=await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    }

    catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
})

router.get('/',async(req,res)=>{
    try{
        const data=await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})



router.get('/taste',async(req,res)=>{
    try{
        const taste=req.params.tasteType;
        if(taste=='spicy'||taste==='sweet')
            {
                const response=await MenuItem.find({taste:tasteType});
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
        const MenuItemid = req.params.id;
        const updatedmenuData = req.body;

        const response = await MenuItem.findByIdAndUpdate(MenuItemid, updatedmenuData, {
            new: true, // Return the updated document
            runValidators: true // Run Mongoose validation on update
        });

        if (!response) {
            return res.status(404).json({error: 'menu not found'});
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
const MenuItemId=req.params.id;//Extract the person's ID from the URL parameter

//Assuming you have a Person model

const response=await MenuItem.findByIdAndDelete(MenuItemId);

if (!response)
    {
        return res.status(404).json({error:'item not found'});
    }
    console.log('data delete');
    res.status(200).json({message:'item Deleted Successfully'})
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})


//comment added for testing purposes

module.exports=router;

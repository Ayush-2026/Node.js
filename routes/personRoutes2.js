const express = require('express');
const router = express.Router();
const person2 = require("../models/person2");
const { findByIdAndDelete } = require('../models/menuItem2');


// POST route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; // this is an object

    // create a new person document using the mongoose model
    const newPerson = new person2(data);

    // Save the new person in database
    const response = await newPerson.save();
    // savedperson is returned by mongoose which contains all the info stored including _id etc.
    console.log("data saved successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});




// GET method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await person2.find();
    console.log("Data displayed");
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET method to get person based on work
router.get("/:workTypeHai", async (req, res) => {
  try {
    const workType = req.params.workTypeHai.toLowerCase(); // extract the work type from the URL parameter
    if (
      workType === "chef" ||
      workType === "manager" ||
      workType === "waiter"
    ) {
      const response = await person2.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// update 
router.put('/:id',async (req,res)=>{
    try{
        const personId = req.params.id; //extract the id from the URL parameter
        const updatedPersonData = req.body; //Data to be updated , sent by the user.

        const response = await person2.findByIdAndUpdate(personId,updatedPersonData,{
            new:true, // return the updated document
            runValidators:true // run mongoose validation
        })

        if(!response){
            return res.status(404).json({error:"Person not found."})
        }

        console.log('data updated');
        res.status(200).json(response);
    
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
        
    }
});

router.delete('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        
            const deletedPerson = await person2.findByIdAndDelete(personId);
            
            if(!deletedPerson){
                return res.status(404).json({error:"Person not found"});
            }
            
            res.status(200).json("Field deleted successfully");        
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
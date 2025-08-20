const express = require('express');
const router = express.Router();
const menuItem2 = require("../models/menuItem2");

// To display all the items present in the menu
router.get('/',async(req,res)=>{
    try{
        const response = await menuItem2.find();
        console.log('Data displayed successfully');
        
        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
        
    }
})


router.get('/:tasteKyaHai',async(req,res)=>{
  try{
    const tasteType = req.params.tasteKyaHai.toLowerCase();
    if(tasteType==='spicy' || tasteType==='sweet' || tasteType==='sour'){
      const taste = await menuItem2.find({taste:tasteType})
      console.log('item fetched successfully');
      
      res.status(200).json(taste);
    }
    else{
      res.status(400).json({error:"Invalid Taste Type"});
    }
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:"Error getting the item."});
    
  }
})

// To add a new item in the menu
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new menuItem2(data);
    const response = await newMenuItem.save();
    console.log("data saved successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error saving data" });
  }
});

module.exports = router;
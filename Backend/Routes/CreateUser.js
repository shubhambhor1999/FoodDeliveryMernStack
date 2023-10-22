const express=require("express");
const router = express.Router();
const User=require("../models/User");
const { body,validationResult } = require("express-validator");

const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtSecret="WelcometoMyWebPageHacking#342422"

router.post("/createuser",body('email').isEmail(),body('password','Incorrect Password').isLength({min:5}) ,async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()})
    }
    var salt= await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);
    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });
        res.json({success:true});

    }
    catch (error) {
        console.log("err" + error);
        res.json({success:false});
    }
})

router.post("/loginuser",body('email').isEmail(),body('password','Incorrect Password').isLength({min:5}),async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()})
    }
    let email=req.body.email;
    try {
        let userData=await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors: "Invalid Id"});
        }
        else
        {
            const checkpwd= await bcrypt.compare(req.body.password,userData.password);
            if(!checkpwd)
            {
                return res.status(400).json({errors: "Invalid Password"});
            }
            const data={
                user:{
                    id:userData.id
                }
            }
            const authtoken=jwt.sign(data,jwtSecret)
            return res.json({success:true,authtoken:authtoken});
        }


    }
    catch (error) {
        console.log("err" + error);
        res.json({success:false});
    }
})

module.exports=router;

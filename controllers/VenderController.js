const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const dotEnv = require("dotenv")

const vendorRegistration = async(req,res)=>{
      const {username,email,password}=req.body;
      const vendorEmail = await Vendor.findOne({email})
      console.log(vendorEmail)
      try{
         if(vendorEmail){
            return res.status(401).json("user already existed")        
         }
         const hashPassword = await bcrypt.hash(password,10);
         const newUser = new Vendor({
                    username,
                    email,
                    password:hashPassword
         })
         await newUser.save()
         res.status(201).json({message:"Vendor registered successfully"})
         console.log("registered")
      }catch(err){
         console.log(err)
         res.status(500).json({error:"Internal server error"})
      }
}

const vendorLogin = async(req,res)=>{
          const {email,password}=req.body;
          const vendor = await Vendor.findOne({email})
          const matchPassword = await bcrypt.compare(password,vendor.password)
          console.log(vendor)
          try{
          if(!vendor ||!matchPassword ){
          return res.status(401).json({message:"Invalid username or password"})               
          }
          const token = jwt.sign({id:vendor._id},process.env.SECRET_KEY,{expiresIn:"1h"})
          const vendorId = vendor._id;
          res.status(201).json({success:"Login successfully",token:token,vendorId})
          console.log("registered",token)
          }catch(err){
           console.log(err)
           res.status(500).json({message:err.message})
         }
   }


   const getAllvendors = async(req,res)=>{
        try{
          const vendors = await Vendor.find().populate('firm')
          res.status(200).json({vendors})
        }catch(err){
          res.status(500).json({message:err.message})
        }
   }

   const getVendorById = async(req,res)=>{
      const vendorId = req.params.id;
      console.log(vendorId)
      try{
        
         const vendor = await Vendor.findById(vendorId).populate("firm")
         if(!vendor){
            return res.status(404).json({message:"Vendor not found"})
         }
         const vendorFirmId = vendor.firm[0]._id;
         res.status(200).json({vendor,vendorFirmId})
      }catch(err){
         res.status(500).json({message:err.message})
      }
   }

              
module.exports = {vendorRegistration,vendorLogin,getAllvendors,getVendorById}
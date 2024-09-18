const express = require("express");
const firmControll = require("../controllers/FirmController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/add-firm",verifyToken,firmControll.addFirm);

router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent("Content-Type","image/jpeg");
    res.sendFile(path.join(__dirname,"..","uploads",imageName))                
})

router.delete("/:firmId",firmControll.deleteFirmById)


module.exports = router
const express = require('express')
const multer = require('multer')
var path = require('path');

const router = express.Router()

const Menurest = require('../../models/Menu/restaurant')

const storage = multer.diskStorage({
    destination:function(req,file, cb){
        cb(null, './uploads/menu')
    },
    filename:function(req,file,cb){
        cb(null, file.originalname)
    }
})

const fileFilter = (req,file, cb)=>{
    //rejectfile
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const upload = multer({
    storage: storage,
    limits :{
        fileSize:1024 * 1024 *5
    },
    fileFilter:fileFilter
})

router.get('/',async(req,res)=>{
    try{
        const menu = await Menurest.find()
        res.json(menu)
        // res.json("Successs")
    }catch(err){
        res.send('Error '+ err)
    }
})

router.get('/:id', async (req,res) => {
    try{
        const menu = await Menurest.findById(req.params.id)
        res.json(menu)
    }catch(err){
        res.send('Error '+ err)
    }
}) 
//post
router.post('/post', upload.single('menu_img') ,async (req,res,next) =>{
    
    const menu = new Menurest({
        menu_name:req.body.mname,
        menu_desc:req.body.desc,
        menu_type:req.body.type,
        menu_ctype:req.body.ctype,
        menu_img:req.file.path,   
    })

    try{
        const menu1 = await menu.save()
        res.json(menu1)

    }catch(err){
        res.send('Error' + err)
    }
})

//Edit
router.patch('/edit/:id', upload.single('menu_img') ,async (req,res,next) =>{
   
    const menu = new Menurest({
        _id: req.params.id,
        menu_name:req.body.mname,
        menu_desc:req.body.desc,
        menu_type:req.body.type,
        menu_ctype:req.body.ctype,
        // Cat_img:req.file.path,   
    })
    
    if(req.file){
       const image = req.file.path
       menu.menu_img = image
    }
    try{
        const catt = await Menurest.findById(req.params.id)
        const a1 = await catt.updateOne({$set:menu},{runValidators: true})
        res.json(a1)
    }catch(err){
        res.send('Error '+ err) 
    }
}) 

router.delete('/:id', async (req,res) => {
    try{
        const menu = await Menurest.findByIdAndRemove(req.params.id)
        res.json(menu)
        // res.json(req.params.id)
    }catch(err){
        res.send('Error '+ err)
    }
}) 

module.exports = router
const express = require('express')
const multer = require('multer')
var path = require('path');

const router = express.Router()

const Category = require('../../models/Category/category')

const storage = multer.diskStorage({
    destination:function(req,file, cb){
        cb(null, './uploads/')
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
        const cat = await Category.find()
        res.json(cat)
        // res.json("Successs")
    }catch(err){
        res.send('Error '+ err)
    }
})

router.get('/:id', async (req,res) => {
    try{
        const cat = await Category.findById(req.params.id)
        res.json(cat)
    }catch(err){
        res.send('Error '+ err)
    }
}) 
//post
router.post('/post', upload.single('cat_img') ,async (req,res,next) =>{
    
    const cat = new Category({
        Cat_name:req.body.cname,
        Cat_show:req.body.show,
        Cat_state:req.body.state,
        Cat_img:req.file.path,   
    })

    try{
        const catt = await cat.save()
        res.json(catt)

    }catch(err){
        res.send('Error' + err)
    }
})

//Edit
router.patch('/edit/:id', upload.single('cat_img') ,async (req,res,next) =>{
    try{
        if(!req.file){
            var datas = new Category({
                _id: req.params.id,
                Cat_name:req.body.cname,
                Cat_show:req.body.show,
                Cat_state:req.body.state,
            })
        }else{
            var datas = new Category({   
                _id: req.params.id,
                Cat_name:req.body.cname,
                Cat_show:req.body.show,
                Cat_state:req.body.state,
                Cat_img:req.file.path,  
            })
        }
        const catt = await Category.findById(req.params.id)
        const a1 = await catt.updateOne({$set:datas},{runValidators: true})
        res.json(a1)
    }catch(err){
        res.send('Error '+ err)
    }

    // const cat = new Category({
    //     _id: req.params.id,
    //     Cat_name:req.body.cname,
    //     Cat_show:req.body.show,
    //     Cat_state:req.body.state,
    //     // Cat_img:req.file.path,   
    // })
    
    // if(req.file){
    //    const image = req.body.path
    //    cat.Cat_img = image
    // }
    // try{
    //     const catt = await Category.findById(req.params.id)
    //     const a1 = await catt.updateOne({$set:cat},{runValidators: true})
    //     res.json(a1)
    // }catch(err){
    //     res.send('Error '+ err) 
    // }
}) 

router.delete('/:id', async (req,res) => {
    try{
        const cat = await Category.findByIdAndRemove(req.params.id)
        res.json(cat)
        // res.json(req.params.id)
    }catch(err){
        res.send('Error '+ err)
    }
}) 

module.exports = router
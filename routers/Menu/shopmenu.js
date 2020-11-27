const express = require('express')
const router = express.Router()

const Shopmenu = require('../../models/Menu/shopmenu')

router.get('/',async(req,res)=>{
    try{
        const menu = await Shopmenu.find()
        res.json(menu)
    }catch(err){
        res.send('Error '+ err)
    }
})

router.get('/:id', async (req,res) => {
    try{
        const menu = await Shopmenu.findById(req.params.id)
        res.json(menu)
    }catch(err){
        res.send('Error '+ err)
    }
}) 
//post
router.post('/post',async (req,res,next) =>{
    
    const shmenu = new Shopmenu({
        menu:req.body.menu,
        menu_desc:req.body.desc,
        disp_det:req.body.disp,
        prate:req.body.prate,
        rate:req.body.rate,  
        salesrate:req.body.sales,
        disc:req.body.disc,
        discamount:req.body.discam,
        avfrom:req.body.from,
        avto: req.body.to,
        active:req.body.active,
        show:req.body.show

    })

    try{
        const shmenu1 = await shmenu.save()
        res.json(shmenu1)

    }catch(err){
        res.send('Error' + err)
    }
})

//Edit
router.patch('/edit/:id',async (req,res,next) =>{
   
    const shmenu = new Shopmenu({
        _id: req.params.id,
        menu:req.body.menu,
        menu_desc:req.body.desc,
        disp_det:req.body.disp,
        prate:req.body.prate,
        rate:req.body.rate,  
        salesrate:req.body.sales,
        disc:req.body.disc,
        discamount:req.body.discam,
        avfrom:req.body.from,
        avto: req.body.to,
        active:req.body.active,
        show:req.body.show
    })
    try{
        const catt = await Shopmenu.findById(req.params.id)
        const a1 = await catt.updateOne({$set:shmenu},{runValidators: true})
        res.json(a1)
    }catch(err){
        res.send('Error '+ err) 
    }
}) 

router.delete('/:id', async (req,res) => {
    try{
        const menu = await Shopmenu.findByIdAndRemove(req.params.id)
        res.json(menu)
        // res.json(req.params.id)
    }catch(err){
        res.send('Error '+ err)
    }
}) 

module.exports = router
const express = require('express')
const multer = require('multer')
var path = require('path');

const router = express.Router()

const Shop = require('../../models/Shop/shop')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/shop')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    //rejectfile
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

router.get('/', async (req, res) => {
    try {
        const shop = await Shop.find()
        res.json(shop)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id)
        res.json(shop)
    } catch (err) {
        res.send('Error ' + err)
    }
})
//post
router.post('/post', upload.single('shop_img'), async (req, res, next) => {

    const shop = new Shop({

        shop_name: req.body.sname,
        shop_cat: req.body.category,
        shop_add: req.body.add,
        shop_ph: req.body.ph,
        open_time: req.body.open,
        clos_time: req.body.close,
        shop_show: req.body.show,
        shop_state: req.body.state,
        minimum: req.body.min,
        shop_disc: req.body.disc,
        shop_discamount: req.body.discam,
        shop_img: req.file.path,
        pickup: req.body.pick,
        delivery: req.body.delivery

    })

    // if(req.file){
    //     const img = req.file.path
    //     shop.shop_img = img    
    // }

    try {
        const shp = await shop.save()
        res.json(shp)

    } catch (err) {
        res.send('Error' + err)
    }
})

//Edit
router.patch('/edit/:id', upload.single('shop_img'), async (req, res, next) => {
    
    const datas = new Shop({
        _id: req.params.id,
        shop_name: req.body.sname,
        shop_cat: req.body.category,
        shop_add: req.body.add,
        shop_ph: req.body.ph,
        open_time: req.body.open,
        clos_time: req.body.close,
        shop_show: req.body.show,
        shop_state: req.body.state,
        minimum: req.body.min,
        shop_disc: req.body.disc,
        shop_discamount: req.body.discam,
        pickup: req.body.pick,
        delivery: req.body.delivery
    })
    if(req.file){
       const image = req.file.path
       datas.shop_img = image  
    }
    try{
        const catt = await Shop.findById(req.params.id)
        const a1 = await catt.updateOne({$set:datas},{runValidators: true})
        res.json(a1)
    }catch(err){
        res.send('Error '+ err)     
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const shop = await Shop.findByIdAndRemove(req.params.id)
        // res.json(shop)
        res.json(req.params.id)
    } catch (err) {
        res.send('Error ' + err)
    }
})

module.exports = router
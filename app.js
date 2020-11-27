const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
var cors = require('cors');

// const url = 'mongodb://localhost/ShopDB';
const app = express();
const url = 'mongodb://shopgi_shopgi:password1234@localhost/shopgi_shopdb';

app.use(cors())

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const con = mongoose.connection;

con.on('open', () => {
    console.log('Connected..');
})

app.use(express.json())
app.use(bodyParser.json());

//Category
const categoryRouter = require('./routers/Category/category')
app.use('/category', categoryRouter)

//Shop
const shopRouter = require('./routers/Shop/shop')
app.use('/shop', shopRouter)

//Rest Menu
const menuRestRouter = require('./routers/Menu/restaurant')
app.use('/menurest', menuRestRouter)

//Shop Menu
const shopMenuRouter = require('./routers/Menu/shopmenu');
// const { Logger } = require('mongodb');
app.use('/shopmenu', shopMenuRouter)

app.listen(3000, () => {
    console.log('Server started', con)

})
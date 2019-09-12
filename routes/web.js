const productRouter = require('express').Router();
const verify = require('./verifyToken');

// Import our Product Model
const Product = require('../model/Product');

productRouter.post('/add', verify,  async (req, res) => {

    try {
        const {name, description, price, quantity} = req.body;

        const product = new Product({
            name: name,
            description: description,
            price: price,
            quantity: quantity
        });

        const newProduct = await product.save();
        res.status(200).send(newProduct); 
    } catch (err) {
        res.status(400).send(err);
    }
    
});

module.exports = productRouter;
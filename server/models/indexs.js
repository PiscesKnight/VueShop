var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
    productId: String,
    productImgs:[String],
    productTitle: String,
    productIntro: String,
    productCover: String,
    productName: String,
    productPrice: String
})

module.exports = mongoose.model('index',productSchema,'indexs');



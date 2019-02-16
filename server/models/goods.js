var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
    productId: String,
    productTitle: String,
    productIntro: String,
    productCover: String,
    productName: String,
    productPrice: String
})

module.exports = mongoose.model('Good',productSchema);



var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
  parents: [{
    productId:String,
    productCover: String,
    productName: String,
    productPrice: String
  }],
  lover: [{
    productId:String,
    productCover: String,
    productName: String,
    productPrice: String
  }],
  ladybro: [{
    productId:String,
    productCover: String,
    productName: String,
    productPrice: String
  }],
  buddy: [{
    productId:String,
    productCover: String,
    productName: String,
    productPrice: String
  }]
})

module.exports = mongoose.model('Ranking',productSchema,'rankings');



var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
  rankingList:[
    {
      productTab:String,
      productId:String,
      productCover: String,
      productName: String,
      productPrice: String,
      checked:Boolean,
      page:Number,
      productStyle:[{
        style:String,
        value:Array
      }]
    }
  ]
})

module.exports = mongoose.model('Ranking',productSchema,'rankings');


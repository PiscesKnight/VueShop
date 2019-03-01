var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema({
      userid: String,
      username: String,
      userpwd:String,
      carlist: [
        {
          productId : String,
          productCover : String,
          productName : String,
          productPrice : String,
          count : Number,
          productStyle : [
            {
              style : String,
              value : Array
            }
          ]
        }
      ]
})

module.exports = mongoose.model("User",userSchema,'users')

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
          count : String,
          productStyle : [
            {
              style : String,
              value : String
            }
          ]
        }
      ]
})

module.exports = mongoose.model("User",userSchema,'users')

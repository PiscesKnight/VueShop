var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema({
      userid: String,
      username: String,
      userpwd:String,
      nickname:String,
      usercover:String,
      userjb:Number,
      carlist: [
        {
          productId : String,
          productCover : String,
          productName : String,
          productPrice : Number,
          count : Number,
          checked:Boolean,
          productStyle : [
            {
              style : String,
              value : Array
            }
          ]
        }
      ],
    orderlist:[
          {
            orderId:String,
            orderTotal:Number,
            productlist:[
              {
                productId : String,
                productCover : String,
                productName : String,
                productPrice : Number,
                count : Number,
                checked:Boolean,
                productStyle : [
                  {
                    style : String,
                    value : Array
                  }
                ]
              }
            ],
            orderStatus:String,
            createDate:String

        }
    ]
})

module.exports = mongoose.model("User",userSchema,'users')

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema({
  users : [
    {
      userid: String,
      username: String,
      userpwd:String,
      carlist: [
        {
          productid: String
        }
      ]
    }]
})

module.exports = mongoose.model("User",userSchema,'users')

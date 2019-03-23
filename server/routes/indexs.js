var express = require('express')
var router =express.Router();
var mongoose = require('mongoose')
var Index = require('../models/indexs')
var Ranking = require('../models/rankings')



//链接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/likeshop',{useNewUrlParser:true})
// mongoose.connect('mongodb://root:123456@127.0.0.1:27017/likeshop',{useNewUrlParser:true})

mongoose.connection.on("connected",()=>{
  console.log("MongoDB connected success")
})

mongoose.connection.on("error",()=>{
  console.log("MongoDB connected fail")
})

mongoose.connection.on("disconnected",()=>{
  console.log("MongoDB connected disconnected")
})

router.get('/',(req,res,next)=>{
  Index.find({}, (err, doc) =>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else {
      res.json({
        status:'0',
        msg:'',
        result:doc


      })
    }
  })
})


router.post('/rankings',(req,res,next)=>{
var param = req.body.params
 Ranking.find({'page':param.page}).exec((err, doc) =>{
   if(err){
     res.json({
       status:'1',
       msg:err.message
     })
   }else {
     res.json({
       status:'0',
       msg:'',
       result: doc
     })
   }
 })
})

//根据productId显示产品
router.post('/getProduct',(req,res,next)=>{
  var productId = req.body.productId

  Ranking.findOne({productId:productId},(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else {
      res.json({
        status:'0',
        msg:'',
        result:doc
      })
    }
  })

})


module.exports = router

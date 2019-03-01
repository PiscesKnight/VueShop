var express = require('express');
var router = express.Router();
var User = require('../models/users')

/* GET users listing. */
router.get('/cartlist',(req,res,next)=>{
  User.find({}, (err, doc) =>{
    if(err){
          res.json({
            status:'1',
            msg:err.message
          })
        }else {
          res.json({
          status:'0',
          msg:'',
          result:{
            count:doc.length,
            users:doc
          }
      })
    }
  })
})

router.post('/cartlistFind',function (req,res,next) {
  var productId = req.body.productId;
  User.find({'users.carlist.productId':productId}, (err,doc)=> {
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else {
      res.json({
        status:'0',
        msg:'',
        result:
          doc.length
      })
    }
  })
})

router.post('/cartlistAdd',function(req,res,next){
  var product = req.body.product;
  var count = req.body.count;
  var styleValue = req.body.styleValue;

  User.updateOne(
    {
      'userid': 'U001'
    },
    {
      $addToSet: {
        carlist: {
          "productId" : product.productId,
          "productCover" : product.productCover,
          "productName" :product.productName,
          "productPrice" : product.productPrice,
          "count" : count,
          "productStyle" : [
            {
              "style" : product.productStyle[0].style,
              "value" : styleValue
            }
          ]
        }

      }
    },
    function(err,result){
      if(err){
        res.json({
          status:'1',
          msg:err.message
        })
      }else {
        res.json({
          status:'0',
          msg:'',
          result:
          result.length
        })
      }
    }
  )
})

module.exports = router;

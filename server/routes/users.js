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
  User.find({'carlist.productId':productId}, (err,doc)=> {
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
  var docLength = req.body.docLength;//拿到上面查询后是否有相同产品的结果

  //购物车列表没有相同产品，添加新产品数据
  if(docLength == 0){
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
            "checked":true,
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
  }else if(docLength == 1){//购物车列表有相同商品
    User.findOne({'carlist':{$elemMatch:{'productId':product.productId,'productStyle.value':styleValue}}},(err,doc)=>{//查询一样的产品是否有相同的规格
      if(err){
          res.json({
            status:'1',
            msg:err.message
          })
      }else {
        if(doc==null){//相同的产品没有一样的规格，更新数量
          console.log('doc==null:'+styleValue)
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
                  "checked":true,
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
        }else {//相同产品单是不同规格，添加新产品
          console.log('doc!=null'+styleValue)
          User.updateOne({'carlist':{$elemMatch:{'productId':product.productId,'productStyle.value':styleValue}}},{$inc:{'carlist.$.count':count}},(err,doc)=> {
            if(err){
              res.json({
                status:'1',
                msg:err.message
              })
            }else {
              res.json({
                status:'0',
                msg:'更新成功',
              })
            }
          })

        }
      }
    })

  }

})

//购物车编辑
router.post('/carEdit',(req,res,next)=>{
  var productId = req.body.productId
  var count = req.body.count
  var styleValue = req.body.styleValue[0].value[0]
  var checked = req.body.checked
  User.updateOne({'carlist':{$elemMatch:{'productId':productId,'productStyle.value':styleValue}}},{'carlist.$.count':count,'carlist.$.checked':checked},(err, doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else {
      console.log('productId:'+productId)
      console.log('productStyleValue:'+styleValue)
      console.log('count:'+count)
      console.log('checked:'+checked)
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      })
    }
  })
})

//添加订单列表
router.post('/orderCreate',(req,res,next)=>{

  User.uppateOne({},{},(err,doc)=>{

  })
})

//订单列表
router.post('/oderlist',(req,res,next)=>{

  User.findOne({'carlist.checked':true},'carlist.checked',function (err,doc) {
      if(err){
        res.json({
          status:'1',
          msg:err.msg,

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

module.exports = router;

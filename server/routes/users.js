var express = require('express');
var router = express.Router();
var User = require('../models/users')
require('./../utils/DateFormat')

/* GET users listing. */
//用户登录注册
router.post('/login',(req,res,next)=>{
  var param={
     userName : req.body.userName,
     userPwd : req.body.userPwd
  }

  User.findOne({$or:[{'username':param.userName,'userpwd':param.userPwd}]},(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else {
      if(doc){
        res.cookie('userid',doc.userid,{
          path:'/',
          maxAge:1000*60*60  //存一个小时
        })
        res.cookie('nickname',doc.nickname,{
          path:'/',
          maxAge:1000*60*60  //存一个小时
        })
        res.cookie('userjb',doc.userjb,{
          path:'/',
          maxAge:1000*60*60  //存一个小时
        })
        res.cookie('usercover',doc.usercover,{
          path:'/',
          maxAge:1000*60*60  //存一个小时
        })
        // req.session.user = doc
        res.json({
          status:'0',
          msg:'',
          result:{
             nickname:doc.nickname,
            usercover:doc.usercover,
            userjb:doc.userjb
          }
        })
      }else {
        res.json({
          status:'1',
          msg:'用户名或密码错误'
        })
      }

    }
  })
})

//退出登录
router.post('/loginOut',(req,res,next)=>{
  res.cookie('userid','',{
    path:'/',
    maxAge:0  //删除cookie存的值
  }),
    res.cookie('nickname','',{
      path:'/',
      maxAge:0  //删除cookie存的值
    })
  res.cookie('usercover','',{
    path:'/',
    maxAge:0  //删除cookie存的值
  })
  res.cookie('userjb','',{
    path:'/',
    maxAge:0  //删除cookie存的值
  })
  res.json({
    status:'0',
    msg:'',
    result:''
  })
})

//检验用户是否登录，保持登录状态
router.get('/checkLogin',function (req,res,next) {
  if(req.cookies.userid){
    res.json({
      status:'0',
      msg:'',
      result:{
        'nickname':req.cookies.nickname,
        'usercover':req.cookies.usercover,
        'userjb':req.cookies.userjb
    }
    })
  }
})

//获取购物车,订单列表
router.get('/cartlist',(req,res,next)=>{
  var userid = req.cookies.userid
  User.findOne({userid:userid}, (err, doc) =>{
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
        'userid': req.cookies.userid
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
          User.updateOne(
            {
              'userid': req.cookies.userid
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
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      })
    }
  })
})

router.post('/carEditAll',(req,res,next)=>{
  var checked = req.body.checked
  var userid = req.cookies.userid
  User.findOne({'userid':userid},(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else {
      if(doc){
        doc.carlist.forEach(function(item){
          item.checked = checked
        })

        doc.save(function (err1,doc1) {
          if(err1){
            res.json({
              status:'1',
              msg:err.message
            })
          }else {
            res.json({
              status:'0',
              msg:'',
              result:doc1.carlist
            })
          }
        })
      }
    }
  })
})

//购物车删除商品
router.post('/carDel',(req,res,next)=>{
  var _id = req.body._id
  var userid = req.cookies.userid

  User.updateOne({'userid':userid},{$pull:{carlist:{_id:_id}}},(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })

    }else {
      res.json({
        status:'0',
        mgs:'',
        result:'suc'
      })
    }
    }

  )
})

//生成订单
router.post('/createOrder',(req,res,next)=>{
  var orderTotal = req.body.orderTotal
  var userid = req.cookies.userid
  User.findOne({userid:userid},(err,doc)=>{
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        })
      }else {
        var productlist =[]
        doc.carlist.forEach((item)=>{
          if(item.checked){
            productlist.push(item)
          }
        })

        var orderId = '001'+Math.floor(Math.random()*100)+new Date().Format('yyyyMMddhhmmss')
        var createDate = new Date().Format('yyyy-MM-dd-hh-mm-ss')
        //创建订单
        var order = {
          orderId:orderId,
          orderTotal:orderTotal,
          productlist:productlist,
          orderStatus:'1',
          createDate:createDate
        }

        doc.orderlist.push(order)

        doc.save(function (err1,doc1) {
          if(err1){
            res.json({
              status:'1',
              msg:err1.message,
              result:''
            })
          }else {
            //  删除购物车商品
            User.updateOne({'userid':userid},{$pull:{carlist:{checked:true}}},(err,doc)=>{
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
                    orderId:order.orderId,
                    orderTotal:order.orderTotal
                  }
                })
              }
            })
          }
        })
      }
  })
})

//订单支付
router.post('/payOrder',(req,res,next)=>{
  var userid = req.cookies.userid
  var userjb = req.body.userjd
  var userPwd = req.body.userPwd
  var orderId = req.body.orderId
  User.updateOne({userid:userid,userpwd:userPwd,'orderlist.orderId':orderId},{userjb:userjb,'orderlist.$.orderStatus':'2'},(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
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

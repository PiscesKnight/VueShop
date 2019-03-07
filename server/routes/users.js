var express = require('express');
var router = express.Router();
var User = require('../models/users')

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
        console.log('userid:'+doc.userid)
        console.log('username:'+doc.username)
        console.log('nickname:'+doc.nickname)
        console.log('userjb:'+doc.userjb)

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
          result:
             doc.userid
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
      result:[
        {'nickname':req.cookies.nickname},
        {'usercover':req.cookies.usercover},
        {'userjb':req.cookies.userjb},
        ]
    })
  }
})

//获取购物车列表
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
  User.findOne({'userid':'U001'},(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else {
      if(doc){
        doc.carlist.forEach(function(item){
          item.checked = checked
          item.checkedAll = checked
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
              result:'suc'
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

  User.updateOne({'userid':'U001'},{$pull:{carlist:{_id:_id}}},(err,doc)=>{
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

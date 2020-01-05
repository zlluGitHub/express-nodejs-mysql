let express = require('express');
let router = express.Router();
let User = require('../schema/user');
/* GET home page. */
router.get('/', (req, ress, next) => {

  //条件查询
  //Model.find(conditions, [fields], [options], [callback])

  User.find({}, function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } else {
      // console.log("Res:" + res);
      ress.json(res);
      console.log('-----全部数据----');
      res.forEach(item=>{
        console.log(item.userpwd);
      });

      console.log('-----id----');
      console.log(res[0]._id);

    }
  })

});

// /**
//  * 插入
//  */
// function insert() {
//   let user = new User({
//       username : 'Tracy McGrady',                 //用户账号
//       userpwd: 'abcd',                            //密码
//       userage: 33447,                                //年龄
//       logindate : new Date()                      //最近登录时间
//   });

//   user.save(function (err, res) {

//       if (err) {
//           // console.log("Error:" + err);
//       }
//       else {
//           console.log("输出内容:" + res);
//       }
//   });
// }
// insert();

// /**
//  * 更新
// Model.findOneAndUpdate([conditions], [update], [options],  [callback])　　　　　　//找到一条记录并更新
// Model.findByIdAndUpdate(id, [update], [options], [callback])　　　　　　//找到一条记录并更新
//  */
// function findByIdAndUpdate() {
//   let id = '5d8c8e110086142670127b99';
//   let updatestr = { 'userpwd': 'zzzzzzzz' };
//   User.findByIdAndUpdate(id, updatestr, function (err, res) {
//     if (err) {
//       console.log("Error:" + err);
//     }
//     else {
//       console.log("Res:" + res);
//     }
//   })
// }

// findByIdAndUpdate();


// //删除
// //Model.findByIdAndRemove(id, [options], [callback])　　
// //Model.findOneAndRemove(conditions, [options], [callback])
// function del() {
//   let wherestr = { 'username': '郑领路' };
//   User.remove(wherestr, function (err, res) {
//     if (err) {
//       console.log("Error:" + err);
//     }
//     else {
//       console.log("Res:" + res);
//     }
//   })
// }
// del();



// res.render('index', { title: 'Express' });





module.exports = router;

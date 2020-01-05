var express = require('express');
var router = express.Router();
let connection = require('../connect');
let tools = require('../public/javascripts/tools');

let sql = 'SELECT * FROM zll_nav';
//查询全部链接数据
router.get('/list', (req, res, next) => {
  let pageNo = req.query.pageNo ? req.query.pageNo : 1;
  let pageSize = req.query.pageSize ? req.query.pageSize : 10;

  if (req.query.title) {

    let sqls = sql + ` where locate ('${req.query.title}' , title) > 0`;
    //获取数据表中数据内容
    connection.query(sqls, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        res.json({ result: false, code: 500 });
        return;
      } else {
        let data = tools.sayPage(result, pageNo, pageSize, req.query.ok, req.query.sort);
        res.json({ result: true, code: 200, count: data.total, list: data.list });
      };
    });
    // 根据分类获取链接
  } else if (req.query.type) {

    let sqls = sql + ` where type = '${req.query.type}'`;
    connection.query(sqls, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        res.json({ result: false, code: 500 });
        return;
      } else {
        let data = tools.sayPage(result, pageNo, pageSize, req.query.ok, req.query.sort);
        res.json({ result: true, code: 200, count: data.total, list: data.list });
      };
    });

  } else if (req.query.id) {
    //获取数据表中数据内容
    connection.query(sql, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        res.json({ result: false, code: 500 });
        return;
      } else {

      }
    });
  } else {
    connection.query(sql, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        res.json({ result: false, code: 500 });
        return;
      } else {
        let data = null, count = null;
        if (req.query.field === 'yes') {
          let content = tools.sayPage(result, pageNo, pageSize, req.query.ok, req.query.sort);
          data = content.list;
          count = content.total;
        } else {
          //前端展示接口
          data = result.filter(item => {
            return item.isIssue === 'yes';
          });
          data = data.reverse();
          data = data.map(item => {
            return {
              bid: item.bid,
              type: item.type,
              title: item.title,
              imgUrl: item.imgUrl,
              url: item.url,
            }
          });
          count = data.length;
        }
        res.json({ result: true, code: 200, count, list: data });
      };
    });
  }
});


//添加链接数据
router.post('/add', (req, res, next) => {
  //获取当前信息
  let dateTime = tools.dateTime();
  let uuid = tools.getUid();
  //插入内容
  let addSql = 'INSERT INTO zll_nav(id,title,url,type,isIssue,content,time,bid,imgUrl,gitHubUrl) VALUES(0,?,?,?,?,?,?,?,?,?)';  //插入数据
  let body = req.body;
  let addSqlParams = [body.title, body.url, body.type, body.isIssue, body.content, dateTime, uuid, body.imgUrl, body.gitHubUrl];
  connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      res.json({ result: false, code: 500 });
      console.log('错误信息：', err.message);
      return;
    } else {
      res.json({ result: true, code: 200 });
    }
  });
});



//删除导航链接数据
router.post('/delete', (req, res, next) => {
  let arr = JSON.parse(req.body.idArr);
  if (arr.length) {
    arr.forEach(id => {
      let delSql = "DELETE FROM zll_nav WHERE bid = ?";
      let params = [id];
      connection.query(delSql, params, (err, result) => {
        if (!err) {
          console.log("bid为" + id + "的导航链接删除成功！");
        } else {
          console.log("bid为" + id + "的导航链接删除失败！");
          return;
        }
      });
    });
    res.json({ result: true, code: 200 });
  } else {
    res.json({ result: false, code: 500 });
  }

});

// 更新链接数据
router.post("/update", (req, res, next) => {
  //更新数据
  let updateSql = 'UPDATE zll_nav SET title = ?, url = ?, type = ?, isIssue = ?, content = ?, time = ?, imgUrl = ?, gitHubUrl = ? WHERE bid = ?';  //更新数据
  let body = req.body;
  let dateTime = body.time ? body.time : tools.dateTime();
  let updateSqlParams = [body.title, body.url, body.type, body.isIssue, body.content, dateTime, body.imgUrl, body.gitHubUrl, body.bid];
  connection.query(updateSql, updateSqlParams, (err, rows) => {
      if (!err) {
          res.json({ result: true, code: 200 });
      } else {
          console.log('错误信息：', err.message);
          return;
      }
  });
});


module.exports = router;

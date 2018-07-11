var express = require('express');
var router = express.Router();
const mysql = require('mysql');



//create  MYSQL Connection
const db = mysql.createConnection({
    host:'127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'installm_bestfood'

});

// connect

db.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
});




/* GET home page. */
router.get('/', function(req, res, next) {
  const qryForCategory = "select c.id as category_id , c.category_name from category c";
  const qryForFood = 'select f.id as food_id, f.food_name from food f';
  db.query(qryForCategory,function(err,resultOfQuery1){
    if (err) {
      console.log("Error : "+err);
        throw err;
    }
    else {
      db.query(qryForFood, function (err,resultOfQuery2) {
          if (err){
            console.log("Error in query 2");
            throw  err;
          }

        res.render('index', {title: 'Express', layout: false, category_data: resultOfQuery1, food_data:resultOfQuery2});
      });
    }
  });

});


router.get('/search',function(req,res){

    var categoryID = req.query.category;
var id = categoryID.join(",");
console.log("-> " + id);
const qry = 'select f.id as food_id, f.food_name from food f where cat_id IN ('+id+') ';
    db.query(qry, function(err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            }
            else
        {
            var data = [];
            for (var i = 0; i < rows.length; i++) {
                data.push('<option value='+rows[i].food_id+'> '+rows[i].food_name+ '</option>');
            }
            console.log(data);
             //res.end(JSON.stringify(data));
            res.json(data);
        }
    });
});


router.post('/',function (req,res) {
    var categories = req.body.category;

    console.log("categories selected : "+categories);
    //res.redirect('/');

    var foods = req.body.food;
    for(var i=0;i<foods.length;++i) {

    }

    res.redirect('/');
});

module.exports = router;

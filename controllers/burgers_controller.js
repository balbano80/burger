var express = require("express");

var burger = require("../models/burger.js");

var router = express.Router();

router.get("/", function(req, res){
    console.log("in controller ALL block");
    burger.all(function(data){
        var burgerObj = {
            burgers: data
        }
        // console.log(burgerObj);
        res.render("index", burgerObj);
    });
});

router.put("/api/burgers/:id", function(req, res){
    console.log("in controller UPDATE block")
    var condition = "id = " + req.params.id;

    console.log("condition " + condition);
    burger.update({
        devoured: true
      }, condition, function(result) {
        if (result.changedRows == 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        } 
        else {
          res.status(200).end();
        }
      });
});

router.post("/api/burgers", function(req, res){
    console.log("in controller CREATE block")
    // console.log(req.body.burger_name);
    burger.create("burger_name", req.body.burger_name, function(result){
        res.json(result);
    });
});

router.post("/api/burgers/delete/:id", function(req, res){
    console.log("in controller DELETE block")
    var condition = "id = " + req.params.id;

    burger.delete({
        condition
      }, function(result){
            // if(result.changedRows == 0){
            //     return res.status(404).end();
            // }
            // else{
                res.status(200).end();
            })
        // });

});

module.exports = router;
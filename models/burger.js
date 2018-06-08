var orm = require("../config/orm.js");

var burger = {
//functions to send data to and from controller go here
    all: function(cb){
        console.log("in model ALL block");
        orm.all("burgers", function(res){
            cb(res);
        });
    },

    update: function(objColVals, condition, cb){
        console.log("in model UPDATE block");
        orm.updateOne("burgers", true, condition, function(res){
            cb(res);
        })
    },

    create: function(cols, vals, cb){
        console.log("in model CREATE block");
        console.log(vals)
        orm.insertOne("burgers", cols, vals, function(res){
            cb(res);
        });
    },
    delete: function(condition, cb){
        console.log("in model DELETE block");
        orm.deleteOne("burgers", condition, function(res){
            cb(res);
        })
    }
};

module.exports = burger;
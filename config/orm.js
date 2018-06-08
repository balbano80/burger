var connection = require("../config/connecton.js");

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }; 
    return arr.toString();
};

  
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      };
    };
};  

var orm = {

// functions to reach out to the database go here

//selectAll();
    all: function(table, cb){
        console.log("in orm ALL block");
        var queryString = "SELECT * from " + table + ";";
        connection.query(queryString, function(err, res){
            if (err) throw err;

            cb(res);
        });
    },

    updateOne: function(table, objColsVals, condition, cb){
        console.log("in orm UPDATE block");
        console.log(objColsVals);

        var queryString = "UPDATE " + table + " SET  devoured=" + objColsVals + " WHERE " + condition;
        
        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) {
              throw err;
            }     
            cb(result);
          });
    
    },

    insertOne: function(table, cols, vals, cb){
        console.log("in orm CREATE block");
        var queryString = "INSERT INTO " + table + "(" + cols.toString() + ") VALUES (?)";
        console.log(queryString);
        connection.query(queryString, vals, function(err, result){
            if (err){
                throw err;
            }
            cb(result);
        });
    },
    deleteOne: function(table, condition, cb){
        console.log("in orm DELETE block");
        var queryString = "DELETE FROM " + table + " WHERE " + condition.condition;
        console.log(queryString);
        connection.query(queryString, function(err, result){
            if (err){
                throw err;
            }
            console.log(result);
            cb(result);
        })
    }
};

module.exports = orm;
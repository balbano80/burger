$(function(){

    $(".devourBtn").on("click", function(event){
        // event.preventDefault();

        console.log("in devour button block");

        var id = $(this).data("burgerid");

        $.ajax("/api/burgers/" + id, {
            type: "PUT"
        }).then(function(){
            console.log("burger with id: " + id + " is now devoured");
            location.reload();
        });
    });

    $(".newBurger").on("submit", function(event){
        event.preventDefault();

        console.log("in new Burger button block");
        
        var newBurger = {
            burger_name: $("#burgerInfo").val().trim()
        };

        console.log(newBurger);
        $.ajax("/api/burgers",{
            type: "POST",
            data: newBurger
        }).then(function(){
            console.log("New burger created");
            location.reload();
        })
    });

    $(".deleteBtn").on("click", function(event){
        event.preventDefault();

        console.log("in delete button block");

        var id = $(this).data("burgerid");
        console.log(id);

        $.ajax("/api/burgers/delete/" + id, {
            type: "POST"
        }).then(function(){
            console.log("burger deleted");
            location.reload();
            location.redirect("/");
        });
    });

});
var actors = ["Robert Downey Jr.", "Keanu Reeves", "Tom Cruise", "Angelina Jolie", "Seth Green", "Will Smith"];
createButtonList();

var state = $(this).attr("data-state");

$(".addGif").on("click", function (event) {
    event.preventDefault();
    var actor = $("#searchText").val().trim();
    actors.push(actor);
    createButtonList();
});

$(document).on("click", ".actor", function () {
    $("#gifDisplay").empty();
    var person = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=t0SPAMsOYxCsC6XOTdoy0DnEKG1DyocW&limit=10";


    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height.url);
                personImage.attr("data-state", "still");
                personImage.attr("data-still", results[i].images.fixed_height_still.url);
                personImage.attr("data-animate", results[i].images.fixed_height.url);
                personImage.attr("id", "gif");
                gifDiv.prepend(p);
                gifDiv.prepend(personImage);
                $("#gifDisplay").prepend(gifDiv);
            }
        });
})

function createButtonList() {
    $("#buttonsList").empty();
    for (var i = 0; i < actors.length; i++) {
        var a = $("<button>");
        a.addClass("actor");
        a.attr("data-name", actors[i]);
        a.text(actors[i]);
        $("#buttonsList").append(a);
    }
}

$(document).on("click", "#gif", function () {
    if (state == "still") {
        $(this).attr('src', $(this).attr("data-animate"));
        state = "animate";
    }
    else {
        $(this).attr('src', $(this).attr("data-still"));
        state = "still";
    }

});
$(document).ready(function () {

    // Array list of preset buttons //
    var topics = ['Snow White and the Seven Dwarfs', 'Pinocchio', 'Fantasia', 'The Reluctant Dragon', 'Dumbo', 'Bambi', 'Saludos Amigos',
        'The Three Calleberos', 'Song of the South', 'Melody Time', 'The Adventures of Ichabod and Mr. Toad', 'Lilo and Stitch'];

    // Function for the buttons from the array to appear //
    function renderButtons() {
        $("#top").empty();
        // For Loop to loop through the Array and append buttons to top//
        for (var i = 0; i < topics.length; i++) {
            var topButton = $("<button>");
            // Adding a class of movie to our button
            topButton.addClass("btn btn-light topBTN");
            // Adding a data-attribute
            topButton.attr("data-name", topics[i]);
            // Providing the initial button text
            topButton.text(topics[i]);
            // Adding the button to the HTML
            $("#top").append(topButton);
        }
    }

    // When you hit a button at the top, it will pull out 10 gifs //
    $(document).on("click", ".topBTN", function () {
        $("#results").empty();
        var topicsName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicsName + "&limit=10&api_key=dc6zaTOxFJmzC"
        $(".bubble").show()

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (resp) {
                var gifDiv = $("#results")
                for (var i = 0; i < resp.data.length; i++) {
                    gifDiv.append("<div id = 'gifdiv'><img id='gif' state = 'still' still='" + resp.data[i].images.fixed_height_still.url +
                        "' animate ='" + resp.data[i].images.fixed_height.url + "' src ='" + resp.data[i].images.fixed_height_still.url + "'><br><span id='span'> Rating : "
                        + resp.data[i].rating + "</span></div>")
                }
            })

    });

    // This function plays and pauses gifs when you click them //
    $(document).on("click", "#gif", function () {
        var state = $(this).attr("state")
        var animate = $(this).attr("animate")
        var still = $(this).attr("still")
        if (state == "still") {
            $(this).attr('src', animate)
            $(this).attr('state', "animate")
        }

        else if (state == "animate") {
            $(this).attr('src', still)
            $(this).attr('state', "still")
        }
    });

    // Adds a button once you submit an imput //
    $("#submit").on("click", function (event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();

        // This line grabs the input from the textbox
        var movie = $("#disney-input").val().trim();

        // Adding the movie from the textbox to our array
        topics.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
        $("#disney-input").val("")
    });

    $(".bubble").hide()
    // Calling the buttons to render //
    renderButtons();

})
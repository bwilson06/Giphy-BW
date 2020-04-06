var topics = ["dogs", "coding", "funny", "cats", "gaming"]

function displayGifs(){
    var gifs = $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gifs + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var results = response.data
        console.log(response)
        $("#gifs").html("")

        for (var i = 0; i < results.length; i ++){
            var rating = results[i].rating
            var p = $("<p>").text("Rating: " + rating)
            var image = $("<img>")
            image.attr("src", results[i].images.fixed_height.url)
            $("#gifs").append(image)
        }

        
    })

}

displayGifs()

function renderButtons(){
    $("#buttons").empty()

    for (var i = 0; i < topics.length; i++){
        var buttons = $("<button>")
        buttons.addClass("topic")
        buttons.attr("data-name", topics[i])
        buttons.text(topics[i])
        $("#buttons").append(buttons)
    }
}

$("#giphy-button").on("click", function(event){
    event.preventDefault()
    var topic = $("#giphy-input").val().trim()
    topics.push(topic)
    $('#giphy-input').val("")
    renderButtons()
})

$(document).on("click", ".topic", displayGifs)



renderButtons()
$(".inProgress").hide();

var lastScrollTop = 0;
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
    var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop){
        $(".inProgress").fadeOut();
        // downscroll code
    } else {
        $(".inProgress").fadeIn();
        // upscroll code
    }
    lastScrollTop = st;
}, false);


$(document).ready(function () {
    var url = "http://chacham.xyz:3000/api/contents/0";
    //Change page later!!! Wooooooork!!!

    $.getJSON(url, function(data) {
        var items = [];
        if( ! data.success){
            //Get Error??
        }
        $.each( data.projects, function( i, data ) {
            var thumbnail = data.thumbnail;
            var category = data.category;
            var writer = data.writer;
            var name = data.name;
            var summary = data.summary;
            var likeCount = data.likeCount;
            var view = data.viewed; //temporary puts 0, it should modify later.
            var comments = data.commentCount;

            var card = document.createElement("div");
            card.className = "card";

            var centerCropped = document.createElement("div");
            centerCropped.className = "center-cropped";

            var cardImage = document.createElement("img");
            cardImage.className = "card-image-top";
            cardImage.setAttribute("src", "http://chacham.xyz:3000/"+thumbnail);
            cardImage.setAttribute("alt", "Card image cap");

            var cardBlock = document.createElement("div");
            cardBlock.className = "card-block";

            var upperRow = document.createElement("div");
            upperRow.className = "row";
            upperRow.setAttribute("id", "upperRow");

            var categoryDiv = document.createElement("div");
            categoryDiv.className = "col-6";
            categoryDiv.setAttribute("id", "category");
            categoryDiv.innerHTML = category;

            var writerDiv = document.createElement("div");
            writerDiv.className = "col-6";
            writerDiv.setAttribute("id", "writer");
            writerDiv.innerHTML = writer;

            var cardTitle = document.createElement("h4");
            cardTitle.className = "card-title";
            cardTitle.setAttribute("id", "name");
            cardTitle.innerHTML = name;

            var cardText = document.createElement("p");
            cardText.className = "card-text";
            cardText.setAttribute("id", "summary");
            cardText.innerHTML = summary;

            var lowerRow = document.createElement("div");
            lowerRow.className = "row";
            lowerRow.setAttribute("id", "lowerRow");

            var viewDiv = document.createElement("div");
            viewDiv.className = "col-4";
            viewDiv.setAttribute("id", "views");
            viewDiv.innerHTML = view;

            var likeDiv = document.createElement("div");
            likeDiv.className = "col-4";
            likeDiv.setAttribute("id", "likes");
            likeDiv.innerHTML = likeCount;

            var commentDiv = document.createElement("div");
            commentDiv.className = "col-4";
            commentDiv.setAttribute("id"," comments");
            commentDiv.innerHTML = comments;

            centerCropped.append(cardImage);

            upperRow.append(categoryDiv);
            upperRow.append(writerDiv);

            lowerRow.append(viewDiv);
            lowerRow.append(likeDiv);
            lowerRow.append(commentDiv);

            cardBlock.append(upperRow);
            cardBlock.append(cardTitle);
            cardBlock.append(cardText);
            cardBlock.append(lowerRow);

            card.append(centerCropped);
            card.append(cardBlock);

            $('.card-deck').append(card)
            .children().last().on( 'click', ()=>{window.location.href = '/api/project/' + data.id} );;

        });
    });

});

var page = 0;

$(window).scroll(function() {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        ++page;
        var url = "http://chacham.xyz:3000/api/contents/"+page;
        //Change page later!!! Wooooooork!!!

        $.getJSON(url, function(data) {
            var items = [];
            if( ! data.success){
                //Get Error??
                --page;
            }
            $.each( data.projects, function( i, data ) {
                var thumbnail = data.thumbnail;
                var category = data.category;
                var writer = data.writer;
                var name = data.name;
                var summary = data.summary;
                var likeCount = data.likeCount;
                var view = data.viewed; //temporary puts 0, it should modify later.
                var comments = data.commentCount;


                var card = document.createElement("div");
                card.className = "card";

                var centerCropped = document.createElement("div");
                centerCropped.className = "center-cropped";

                var cardImage = document.createElement("img");
                cardImage.className = "card-image-top";
                cardImage.setAttribute("src", "http://chacham.xyz:3000/"+thumbnail);
                cardImage.setAttribute("alt", "Card image cap");

                var cardBlock = document.createElement("div");
                cardBlock.className = "card-block";

                var upperRow = document.createElement("div");
                upperRow.className = "row";
                upperRow.setAttribute("id", "upperRow");

                var categoryDiv = document.createElement("div");
                categoryDiv.className = "col-6";
                categoryDiv.setAttribute("id", "category");
                categoryDiv.innerHTML = category;

                var writerDiv = document.createElement("div");
                writerDiv.className = "col-6";
                writerDiv.setAttribute("id", "writer");
                writerDiv.innerHTML = writer;

                var cardTitle = document.createElement("h4");
                cardTitle.className = "card-title";
                cardTitle.setAttribute("id", "name");
                cardTitle.innerHTML = name;

                var cardText = document.createElement("p");
                cardText.className = "card-text";
                cardText.setAttribute("id", "summary");
                cardText.innerHTML = summary;

                var lowerRow = document.createElement("div");
                lowerRow.className = "row";
                lowerRow.setAttribute("id", "lowerRow");

                var viewDiv = document.createElement("div");
                viewDiv.className = "col-4";
                viewDiv.setAttribute("id", "views");
                viewDiv.innerHTML = view;

                var likeDiv = document.createElement("div");
                likeDiv.className = "col-4";
                likeDiv.setAttribute("id", "likes");
                likeDiv.innerHTML = likeCount;

                var commentDiv = document.createElement("div");
                commentDiv.className = "col-4";
                commentDiv.setAttribute("id"," comments");
                commentDiv.innerHTML = comments;

                centerCropped.append(cardImage);

                upperRow.append(categoryDiv);
                upperRow.append(writerDiv);

                lowerRow.append(viewDiv);
                lowerRow.append(likeDiv);
                lowerRow.append(commentDiv);

                cardBlock.append(upperRow);
                cardBlock.append(cardTitle);
                cardBlock.append(cardText);
                cardBlock.append(lowerRow);

                card.append(centerCropped);
                card.append(cardBlock);

                $('.card-deck').append(card)
                    .children().last().on( 'click', ()=>{window.location.href = '/api/project/' + data.id} );;
            });
            if (data.projects.length < 20) {
                $(window).off("scroll");
            }
        });
    }
});

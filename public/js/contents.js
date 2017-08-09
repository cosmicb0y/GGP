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
    var url = "http://chacham.xyz:3000/api/contents/1";

    $.getJSON(url, function(data) {
        var items = [];
        $.each( data, function( i, data ) {
            var thumbnail = data.thumbnail;
            var category = data.category;
            var writer = data.writer;
            var name = data.name;
            var summary = data.summary;
            var likeCount = data.likeCount;
            var view = data.viewed; //temporary puts 0, it should modify later.
            var comments = data.commentCount;

            $('.card-deck').append('                <div class="card">\n' +
                "                    <div class=\"center-cropped\">\n" +
                '                        <img class="card-img-top" src="http://chacham.xyz:3000/'+thumbnail+' " alt="Card image cap">\n' +
                "                    </div>\n" +
                "                    <div class=\"card-block\">\n" +
                "                        <div class=\"row\" id=\"upperRow\">\n" +
                '                            <div class="col-sm-6" id="category">'+category+'</div>\n' +
                '                            <div class="col-sm-6" id="writer">'+writer+'</div>\n' +
                "                        </div>\n" +
                '                        <h4 class="card-title" id="name">'+name+'</h4>\n' +
                '                        <p class="card-text" id="summary">'+summary+'</p>\n' +
                "                        <div class=\"row\" id=\"lowerRow\">\n" +
                '                            <div class="col-sm-4" id="views">'+view+'</div>\n' +
                '                            <div class="col-sm-4" id="likes">'+likeCount+'</div>\n' +
                '                            <div class="col-sm-4" id="comments">'+comments+'</div>\n' +
                "                        </div>\n" +
                "                    </div>\n" +
                "\n" +
                "                </div>");


        });
    });

});

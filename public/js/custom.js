$(".nav-item").on("click", function(event) {
    event.preventDefault(); 
    $("html, body").animate({
        scrollTop: $($(event.target).attr("href")).offset().top - $("nav").height()
    }, 500); 

    $(".navbar-nav").find('.active').removeClass("active"); 
    $(event.target).addClass("active");
})

var scrollItems = $(".nav-item") 
var sections = $("section") 

$(window).scroll(function() {
    var topSection = $(this).scrollTop() + $("nav").height();
    var cur = sections.map(function() {
        if ($(this).offset().top < topSection + 10) return this; 
    });
    cur = cur[cur.length-1];
    if (cur === undefined) {
        cur = $("#page-top")[0]
    }
    $(".navbar-nav").find('.active').removeClass("active"); 
    $(scrollItems).filter("[href='#" + cur.id + "']").addClass("active"); 
})



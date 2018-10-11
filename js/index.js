$(document).ready(function(){
    var IwindowWidth = $(window).width();
    var IelementAbs = $(".location").outerWidth();

    $(".forecast").css("width", `${IwindowWidth-IelementAbs -32}px`);

    $(window).on("resize", function(){
        var windowWidth = $(window).width();
        var elementAbs = $(".location").outerWidth();

        $(".forecast").css("width", `${windowWidth-elementAbs -32}px`);
    })
    $(".forecast-box-sunmoon").on("click", function(){
        $(".forecast-box-sunmoon-content-box-sun").addClass("active");
    })
})
$(document).ready(function(){

    $(window).on("resize", function(){
        var windowWidth = $(window).width();
        var elementAbs = $(".location").outerWidth();

        $(".forecast").css("width", `${windowWidth-elementAbs -32}px`);
    })
})
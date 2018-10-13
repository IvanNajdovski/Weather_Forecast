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
    // --------------------WIND TURBINE ROTATION--------------------------

    var speed = $(".forecast-box-wind-content-text").children("p").text().split(" ")[0] ;
    $(".wind-wing-rotate").css("animation", `wind ${50/speed}s infinite linear`)

    if($(".uvIndex").text() < 3){
        $(".uvIndex-span").text("(Low)")
    }else if($(".uvIndex").text() > 3){
        $(".uvIndex-span").text("(Moderate)")
    }else if($(".uvIndex").text() > 6){
        $(".uvIndex-span").text("(High)")
    }else if($(".uvIndex").text() > 8){
        $(".uvIndex-span").text("(Very High)")
    }
        if($(".rain-1").text("Morning")){
            $(".rain-2").text("Afternoon");
            $(".rain-3").text("Evening");
            $(".rain-4").text("Night");
        }else if($(".rain-1").text("Afternoon")){
            $(".rain-2").text("Evening");
            $(".rain-3").text("Night");
            $(".rain-4").text("Morning");
        }else if($(".rain-1").text("Evening")){
            $(".rain-2").text("Night");
            $(".rain-3").text("Morning");
            $(".rain-4").text("Afternoon");
        }else if($(".rain-1").text("Night")){
            $(".rain-2").text("Morning");
            $(".rain-3").text("Afternoon");
            $(".rain-4").text("Evening");
        }


})
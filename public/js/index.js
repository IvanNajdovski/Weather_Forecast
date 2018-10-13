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


        setTimeout(function(){
            $(".navigation__logo").addClass("animate");
        },2000);
    setTimeout(function(){
        $(".navigation__logo").addClass("active");
    },3000);
        setTimeout(function(){
            var currentHour = $(".currentHour").text()
            var sunrise = $(".sunrise").text().split(":")[0].trim()
            var sunset = $(".sunset").text().split(":")[0].trim()
            var width =(currentHour-sunrise) * 100 / (sunset-sunrise);
            var rotate = ((135/100)*width)+20
            console.log(currentHour , sunrise ,sunset , width)
            $(".forecast-box-sunmoon-content-box-background").css("width",`${width}%`);
            $(".forecast-box-sunmoon-content-box-background").css("transition","width 2s");
            $(".forecast-box-sunmoon-content-box-sun").css("transform", `translate(-5rem, -5rem) rotate(${rotate}deg`);
            $(".forecast-box-sunmoon-content-box-sun").css("transition","all 2s");
        },2000)

})
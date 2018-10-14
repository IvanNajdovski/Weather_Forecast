function isScrolledIntoView(a) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = a.offset().top;
    var elemBottom = elemTop + a.outerHeight();


    if (elemBottom > docViewTop && elemTop < docViewBottom) {
        a.addClass("active");
    }
};


$(document).ready(function () {
    var IwindowWidth = $(window).width();
    var IelementAbs = $(".location").outerWidth();

    $(".forecast").css("width", `${IwindowWidth - IelementAbs - 32}px`);

    $(window).on("resize", function () {
        var windowWidth = $(window).width();
        var elementAbs = $(".location").outerWidth();

        $(".forecast").css("width", `${windowWidth - elementAbs - 32}px`);
    })
    $(".forecast-box-sunmoon").on("click", function () {
        $(".forecast-box-sunmoon-content-box-sun").addClass("active");
    });

    $(window).on("scroll", function () {
        if ($(window).scrollTop() > 0) {
            $(".navigation").addClass("active");
        } else {
            if ($(".navigation").hasClass("active")) {
                $(".navigation").removeClass("active")
            }
        }
    })
    // --------------------WIND TURBINE ROTATION--------------------------

    var speed = $(".forecast-box-wind-content-text").children("p").text().split(" ")[0];
    $(".wind-wing-rotate").css("animation", `wind ${50 / speed}s infinite linear`)

    if ($(".uvIndex").text() < 3) {
        $(".uvIndex-span").text("(Low)")
    } else if ($(".uvIndex").text() > 3) {
        $(".uvIndex-span").text("(Moderate)")
    } else if ($(".uvIndex").text() > 6) {
        $(".uvIndex-span").text("(High)")
    } else if ($(".uvIndex").text() > 8) {
        $(".uvIndex-span").text("(Very High)")
    }
    if ($(".rain-1").text("Morning")) {
        $(".rain-2").text("Afternoon");
        $(".rain-3").text("Evening");
        $(".rain-4").text("Night");
    } else if ($(".rain-1").text("Afternoon")) {
        $(".rain-2").text("Evening");
        $(".rain-3").text("Night");
        $(".rain-4").text("Morning");
    } else if ($(".rain-1").text("Evening")) {
        $(".rain-2").text("Night");
        $(".rain-3").text("Morning");
        $(".rain-4").text("Afternoon");
    } else if ($(".rain-1").text("Night")) {
        $(".rain-2").text("Morning");
        $(".rain-3").text("Afternoon");
        $(".rain-4").text("Evening");
    }


    setTimeout(function () {
        $(".navigation__logo").addClass("animate");
    }, 2000);
    setTimeout(function () {
        $(".navigation__logo").addClass("active");
    }, 3000);


    $(window).on("resize scroll", function () {
        var currentHour = $(".currentHour").text()
        var sunrise = $(".sunrise").text().split(":")[0].trim()
        var sunset = $(".sunset").text().split(":")[0].trim()
        var width = (currentHour - sunrise) * 100 / (sunset - sunrise);
        var rotate = ((135 / 100) * width) + 20

        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(".forecast-box-sunmoon-content-box-background").offset().top;
        var elemBottom = elemTop + $(".forecast-box-sunmoon-content-box-background").outerHeight();


        if (elemBottom > docViewTop && elemTop < docViewBottom - 200) {


            console.log(currentHour, sunrise, sunset, width)
            $(".forecast-box-sunmoon-content-box-background").css("width", `${width}%`);
            $(".forecast-box-sunmoon-content-box-background").css("transition", "width 2s");
            $(".forecast-box-sunmoon-content-box-sun").css("transform", `translate(-5rem, -5rem) rotate(${rotate}deg`);
            $(".forecast-box-sunmoon-content-box-sun").css("transition", "transform 2s");
            if (currentHour < sunrise && currentHour > sunset) {
                //$(".sun-circle").css("display","none")
                $(".forecast-box-sunmoon-content-box-sun").css("display", "none")
                $(".forecast-box-sunmoon-content-box-background").css("width", `0`);
            }

        }
    });
    var getLocation = JSON.parse(localStorage.getItem("myLocation"));
    if(getLocation) {
        getLocation.forEach(function (val) {
            if (val === $(".content__location-box-header").text()) {

                $(".addToMyLocations").attr("title", "Remove From My Locations");
                $(".addLocation").addClass("active");
            }
            var text = $("<li class='location__item-box-location'></li>").text(val);
            $(".location__item-box").append(text);
        });
    }

    $(".addToMyLocations").on("click", function (e) {

        e.preventDefault();
        if ($(".addLocation").hasClass("active")) {
            e.stopImmediatePropagation();
            e.preventDefault();

            var start = JSON.parse(localStorage.getItem('myLocation'));
            start = start.filter(function (val) {

                return val !== $(".content__location-box-header").text();
            })
            $(".location__item-box").empty();
            start.forEach(function (val) {

                var text = $("<li class='location__item-box-location'></li>").text(val);
                $(".location__item-box").append(text);
            });
            $(".addLocation").removeClass("active");
            $(".addToMyLocations").attr("title", "Add To My Locations");
            localStorage.setItem("myLocation", JSON.stringify(start));


        } else {

            e.preventDefault();
            var location = [];
            var start = JSON.parse(localStorage.getItem('myLocation'));
            if (start) {
                start.forEach(function (val) {
                    location.push(val);
                });

            }


            location.push(`${$(".content__location-box-header").text()}`);
            localStorage.setItem("myLocation", JSON.stringify(location));
            var location = localStorage.getItem("myLocation");
            console.log(location);
            var text = $("<li class='location__item-box-location'></li>").text($(".content__location-box-header").text());
            $(".location__item-box").append(text);

            $(".addLocation").addClass("active");
            $(".addToMyLocations").attr("title", "Remove From My Locations");
        }

        //
    });
    $(document).on("click", ".location__item-box-location", function (event, e) {

        event.preventDefault();
        $("#team_name").attr("value", `${$(this).text()}`);
        $(".navigation__form").submit();
    });


})
const express = require("express");
const axios = require("axios");
const app = express();
const timezone = require("moment-timezone");


const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');



app.get("/", function(req,response){
    var sunrise;
    var offsetH;
    var timeFormat;
    var time;
    var address = "Skopje";
    var wedRes;
    var geoLoc;
    var lat;
    var lng;
    var location;
    var encodedAddress = encodeURIComponent(address);
    var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=7GFxV3ltTE7b3JIsDApuBtch2rJNzKBI&location=Skopje`;

    return axios.get(geocodeUrl).then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    location = response.data.results[0].locations[0].adminArea5;
    geoLoc = response.data;
    lat = response.data.results[0].locations[0].latLng.lat;
    lng = response.data.results[0].locations[0].latLng.lng;
    var weatherUrl = `https://api.darksky.net/forecast/bc5ef75e2e5f0b731e4574d01fe00ae2/${lat},${lng}?units=si`;
    return axios.get(weatherUrl);
}).then((response) => {
        time = timezone(response.data.currently.time * 1000).tz(response.data.timezone).format("Z z");
        offsetH = (Number(time.split(":")[0] ) );
        offset = (Number(time.split(":")[0] ) )*1000*60*60;
        sunrise = timezone(response.data.daily.data[0].sunsetTime* 1000).tz(response.data.timezone).format();
        wedRes = response.data;
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var picLoc = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c11bf5d4dd61901c8e1fb260bf4a1ad0&text=city&text=view&content_type=screenshot&lat=${lat}&lon=${lng}&format=json&nojsoncallback=1`;
    return axios.get(picLoc);
}).then((res)=>{
        if (res.data.photos.photo.length > 3){

        var url = [
            `https://farm${res.data.photos.photo[0].farm}.staticflickr.com/${res.data.photos.photo[0].server}/${res.data.photos.photo[0].id}_${res.data.photos.photo[0].secret}_b.jpg`,
            `https://farm${res.data.photos.photo[1].farm}.staticflickr.com/${res.data.photos.photo[1].server}/${res.data.photos.photo[1].id}_${res.data.photos.photo[1].secret}_b.jpg`,
            `https://farm${res.data.photos.photo[2].farm}.staticflickr.com/${res.data.photos.photo[2].server}/${res.data.photos.photo[2].id}_${res.data.photos.photo[2].secret}_b.jpg`
        ];
        response.render("home", {offsetH : offsetH, offset : offset, wed: wedRes, geo: geoLoc , photo: url});
    }else{
        response.render("home", {offsetH : offsetH, offset : offset, wed: wedRes, geo: geoLoc ,photo:1 });
    }



}).catch((e) => {
        if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});


});
app.post("/", function(req,response){
    var sunrise;
    var offsetH;
    var offset;
    var address = req.body.name;
    var wedRes;
    var geoLoc;
    var location;
    var lat;
    var lng;
    var encodedAddress = encodeURIComponent(address);
    var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=wnVZLMTICCKY3Sc4aZLyryjjmFrcLOQL&location=${encodedAddress}`;

    return axios.get(geocodeUrl).then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    location = response.data.results[0].locations[0].adminArea5;
    geoLoc = response.data;
    lat = response.data.results[0].locations[0].latLng.lat;
    lng = response.data.results[0].locations[0].latLng.lng;
    var weatherUrl = `https://api.darksky.net/forecast/bc5ef75e2e5f0b731e4574d01fe00ae2/${lat},${lng}?units=si`;
    return axios.get(weatherUrl);
}).then((response) => {
        time = timezone(response.data.currently.time * 1000).tz(response.data.timezone).format("Z z");
        sunrise = timezone(response.data.daily.data[0].sunsetTime * 1000).tz(response.data.timezone).format();
        offsetH = (Number(time.split(":")[0] ) )
        offset = (Number(time.split(":")[0] ) )*1000*60*60;
        wedRes = response.data;
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var picLoc = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c11bf5d4dd61901c8e1fb260bf4a1ad0&text=city&content_type=screenshot&lat=${lat}&lon=${lng}&format=json&nojsoncallback=1`;
    return axios.get(picLoc);
}).then((res)=>{

        if (res.data.photos.photo.length > 3){

        var url = [
            `https://farm${res.data.photos.photo[0].farm}.staticflickr.com/${res.data.photos.photo[0].server}/${res.data.photos.photo[0].id}_${res.data.photos.photo[0].secret}_b.jpg`,
            `https://farm${res.data.photos.photo[1].farm}.staticflickr.com/${res.data.photos.photo[1].server}/${res.data.photos.photo[1].id}_${res.data.photos.photo[1].secret}_b.jpg`,
            `https://farm${res.data.photos.photo[2].farm}.staticflickr.com/${res.data.photos.photo[2].server}/${res.data.photos.photo[2].id}_${res.data.photos.photo[2].secret}_b.jpg`
        ];
        response.render("home", {offsetH : offsetH, offset : offset, wed: wedRes, geo: geoLoc , photo: url});
    }else{
        response.render("home", {offsetH : offsetH, offset : offset, wed: wedRes, geo: geoLoc, photo:1 });
    }
}).catch((e) => {
        if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});
})


           app.listen(port, ()=>{
               console.log("Portal open on port 3000")
           })















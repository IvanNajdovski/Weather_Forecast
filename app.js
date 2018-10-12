const express = require("express");
const axios = require("axios");
const app = express();


const bodyParser = require("body-parser");


// const geocode = require('./geocode/geocode');
// const weather = require('./weather/weather');
// const photo = require('./flickr/flickr');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');

// geocode.geocodeAddress( (errorMessage, results) => {
//     if(errorMessage) {
//         console.log(errorMessage);
//     } else {
//         var location = results.address;
// var latitude = results.latitude;
// var longitude = results.longitude;
// weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
//     if(errorMessage) {
//         console.log(errorMessage);
//     } else {
//         //console.log(location,latitude,longitude);
//         var temperature = weatherResults.temperature
//         //console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
//         photo.getPhoto(latitude, longitude, (errorMessage, photoResults) => {
//         if(errorMessage) {
//             console.log(errorMessage);
//         }else {
//             //response.render("home", {temp: temperature, name: location})
//         console.log(location, latitude, longitude);
// console.log("temperature is ", temperature);
// console.log("Photo data")
//
// console.log(JSON.stringify(photoResults.photo, undefined, 4))
// console.log(photoResults.url)
// }
// })
// }
// })
// ;
// }
//
//
// })

app.get("/", function(req,response){
    var address = "Skopje"
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
        wedRes = response.data;
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var picLoc = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c11bf5d4dd61901c8e1fb260bf4a1ad0&text=city&content_type=screenshot&lat=${lat}&lon=${lng}&format=json&nojsoncallback=1`;
    return axios.get(picLoc);
}).then((res)=>{
        var number = Math.round(Math.random()*10);
    var url = `https://farm${res.data.photos.photo[number].farm}.staticflickr.com/${res.data.photos.photo[number].server}/${res.data.photos.photo[number].id}_${res.data.photos.photo[number].secret}.jpg`;
        response.render("home", {wed: wedRes, geo: geoLoc , photo: url})
        console.log(JSON.stringify(res.data,undefined,2))
    console.log(JSON.stringify(wedRes, undefined,2));
    console.log(JSON.stringify(geoLoc,undefined,2));

}).catch((e) => {
        if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});


})
app.post("/", function(req,response){
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
        wedRes = response.data;
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var picLoc = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c11bf5d4dd61901c8e1fb260bf4a1ad0&content_type=screenshot&lat=${lat}&lon=${lng}&format=json&nojsoncallback=1`;
    return axios.get(picLoc);
}).then((res)=>{
        var number = Math.round(Math.random()*10);
    var url = `https://farm${res.data.photos.photo[number].farm}.staticflickr.com/${res.data.photos.photo[number].server}/${res.data.photos.photo[number].id}_${res.data.photos.photo[number].secret}_b.jpg`;
    response.render("home", {wed: wedRes, geo: geoLoc , photo: url})
        console.log(JSON.stringify(response.data,undefined,2))
    console.log(JSON.stringify(wedRes, undefined,2));
    console.log(JSON.stringify(geoLoc,undefined,2));

}).catch((e) => {
        if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});
})







           app.listen(3000, ()=>{
               console.log("Portal open on port 3000")
           })















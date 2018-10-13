const request = require('request');

var getPhoto = (lat, lng, callback) => {

    request({
        url: `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c11bf5d4dd61901c8e1fb260bf4a1ad0&content_type=screenshot&lat=${lat}&lon=${lng}&format=json&nojsoncallback=1`,
        json: true
    }, (error, response, body) => {
        var number = Math.round(Math.random()*10)
        if (error) {
            callback('Unable to connect to Flickr.io server.');
        } else if (response.statusCode === 400) {
        callback('Unable to fetch weather.');
    } else if (response.statusCode === 200) {
        callback(undefined, {
            photo : body,

            url : `https://farm${body.photos.photo[number].farm}.staticflickr.com/${body.photos.photo[number].server}/${body.photos.photo[number].id}_${body.photos.photo[number].secret}.jpg`,
        });
    }
});
};

module.exports.getPhoto = getPhoto;

const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/bc5ef75e2e5f0b731e4574d01fe00ae2/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forecast.io server.');
    } else if (!error && response.statusCode === 200) {
        callback(undefined, {
            results: body,
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
        })
    } else {

          callback('Unable to fetch weather.');

    }
  });
};

module.exports.getWeather = getWeather;

const request = require('postman-request');

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ebaa598856c6920d64766588c3fc3358&query=' + lat + ',' + lon + '&units=m'
    
    request({ url: url, json: true},  (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined);
        } else if (body.error) { 
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.");
        }
    })
}

module.exports = forecast

const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGhlbWFueTE3MiIsImEiOiJjbGV5ZTJjMDcwNDU1M3hwdTQwZmRiajFtIn0.Z8uFyeX80nAKDut6Pl1kCg&limit=1'

    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location provider', undefined)
        } else if (body.features.length === 0) {
            callback('unable to provide location, please check your search and try again', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
    
}

module.exports = geocode
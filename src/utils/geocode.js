const request = require('postman-request')

const geocode = (address, callback) => {                               //return string, even with special chars
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW9zaGEyMSIsImEiOiJja2p4azVmNWEwNHJ4MnBvNDR2OHR2OXZ6In0.DqF5spwdwNdSEPnER7Ik2w&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitud: body.features[0].center[1],
                longitud: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
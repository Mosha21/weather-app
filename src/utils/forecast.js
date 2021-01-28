const request = require('postman-request')

const forecast = (latitude, longitud, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9517565abc7cdb077b6b8aa94227ff2e&query=' + latitude + ',' + longitud + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            console.log(url)
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const temperature = body.current.temperature
            const feelsLikeTemp = body.current.feelslike
            const humidity = body.current.humidity
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelsLikeTemp + ' degrees out. There is a humidity of ' + humidity)
        }
    })
}

module.exports = forecast
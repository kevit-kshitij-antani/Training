const request = require('postman-request')

const forecast = (lat,long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=ae300dd54e5bcfb63a1b76c26f09a6ad&query='+ lat + ',' + long + '&units=m'

    request({ url: url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        }
        else if (body.error) {
            callback('Unable to find loaction. Try to search another!', undefined)
        }
        else {
            callback(undefined, 
                { Atmosphere: body.current.weather_descriptions[0],
                Temperature: body.current.temperature +' Celsius' })

        }
    })
}

module.exports = forecast
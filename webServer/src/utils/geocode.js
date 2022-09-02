const request = require('postman-request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3NoaXRpamFudGFuaSIsImEiOiJjbDZ3M3M2bnEyZW5zM2psZWdjY295M2FxIn0.o76gvO0CV91KTWmxhFpWkg&limit=1'

    request({ url: url, json: true }, (error, { body } = {} ) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find loaction. Try to search another!', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                Place: body.features[0].place_name
            })

        }
    })
}

module.exports = geocode
const express = require('express')
const path = require('path')
const hbs = require('hbs')

// Require gecode and forecast file 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// WebServer
const app = express()

// Directories for partials, handlebars and css/json/js/etc files
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


// Setup for partials and hbs files
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Using the main public path 
app.use(express.static(publicDirectoryPath))


// Get Home Page                    // app.com
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kshitij Antani'
    })
})

// Get About Page                   // app.com/about
app.get('/about', (req, res) => {
    res.render('about', {
        aboutText: 'It is a weather application.',
        name:'Kshitij Antani'
    })
})

// Get Help Page                    // app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Include some text that helps finding data.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {

        title:'404',
        error_message: 'Page not Found'
    })
})

// Get Weather Page                 // app.com/weather
app.get('/weather', (req, res) => {

    if (!req.query.address) {

        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, Place} = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: Place,
                address: req.query.address
            })
        })
    })


    // console.log(req.query.address)
   
})


//To start the server and we use 3000 port
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})


// Get Product Page
// app.get('/products', (req, res) => {
//     console.log(req.query.rating)
//     res.send({
//         products:[]
//     })
// })


// 
// app.get('/help/*' , (req, res) => {
//     res.render('404', {

//         title:'404',
//         error_message: 'Help article not found'
//     })
// })










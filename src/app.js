const path = require('path');
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "TheMany"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: "TheMany"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            Error: "Please provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                Error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    Error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})



app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: "Does this help you?",
        name: "TheMany"
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            Error: "Please provide a search term"
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})



// wildcard routes below ------------------------------------
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "TheMany",
        errorMessage: "404 - Sorry - the help page you were looking for cannot be found."
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "TheMany",
        errorMessage: "What the quack is going on h... oh I see... 404 - Sorry - that page cannot be found."
    })
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})
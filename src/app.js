const path = require('path');
const express = require('express');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express();

const hbs = require('hbs');




// setting static path for express config
const direcetoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setting up handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setting up sirectory to serve
app.use(express.static(direcetoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aditya Shukla'
    })
})

// rendering about page

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aditya Shukla'
    })
})

// Rendering Help Page

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is some helpful text!',
        name: 'Aditya Shukla'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode.geocode(req.query.address, (error, {latitude, longitude, location}= {}) => {
        if(error){
            return res.send({error})
        }

        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'Its 15 degree here',
    //     location: 'Ghaziabad',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article is not found.',
        name: 'Aditya Shukla'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found.',
        name: 'Aditya Shukla'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
})
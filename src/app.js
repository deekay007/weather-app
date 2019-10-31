const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//define paths for express
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPaths = path.join(__dirname, '../templates/partials');

//setting paths for views and partials
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirPath));
hbs.registerPartials(partialPaths);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name : 'Deepak Kumar'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Deepak Kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'How can i help you?'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
        return res.send({
            error: 'You must provide the address'
        });

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error)
            return res.send({
                error: error
            })

        forecast(latitude, longitude, (error, data) => {
            if(error)
                return res.send({
                    error: error
                })
    
            res.send({
                location,
                forecast: data
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search)
        return res.send('You must provide a search query');

    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : 'Help page error',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is live on 3000');
})
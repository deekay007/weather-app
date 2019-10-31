const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/bde962f1d63af078ddac029339edb828/'+latitude+','+longitude+'?units=si';

    request({url, json:true}, (error, response) => {
        if(error)
            callback('Unable to connect to internet', undefined);
        else if(response.body.error)
            callback('Unable to fetch weather', undefined);
        else    
            callback(undefined, 'Temperature is '+ response.body.currently.temperature + ' with ' + response.body.currently.precipProbability+' % of rain.')
    })
}

module.exports = forecast;
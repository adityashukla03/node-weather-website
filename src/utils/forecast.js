const request = require('request')

const forecast = (latitude, longitude, callbackForecast) =>{
    
    const url = 'https://api.darksky.net/forecast/ba0c6662f338f6077c86c317d5d591a6/'+ longitude + ','+latitude +'?units=si'
    request({url: url, json: true}, (error, { body }) =>{
        if(error){
            callbackForecast('Unable to connect to weather service!', undefined)
        }
        else if(body.error){
            callbackForecast('Unable to find the location. try searching again!', undefined)
        }else{
            // callbackForecast(undefined, {
            //     temprature :  body.currently.temperature,
            //     rainProbability :  body.currently.precipProbability,
            //     summary: body.daily.data[0].summary

            // })
            callbackForecast(undefined, body.daily.data[0].summary  + ' It is currently ' + body.currently.temperature + ' degrees out. ' + 'There is ' + body.currently.precipProbability + '% chance of rain. Todays highest temprature till now is ' + body.daily.data[0].temperatureHigh + ' and lowest is ' + body.daily.data[0].temperatureLow + '.');
        }
    })
}

module.exports = {
    forecast: forecast
}
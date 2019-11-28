const request = require('request');

const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWRpdHlhc2h1a2xhIiwiYSI6ImNrMzc2ZjdqNjAwaTMzYnBjNnk2ZjgwbWQifQ.rvT7sjy7r_fNA0Yr6touUQ&limit=1'
    request({url: url, json: true}, (error, { body } = {}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }
        else if(body.features.length === 0){
            callback('Address not found! Try searching again.', undefined)
        }
        else{
            callback(undefined, {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

    // request({url, json:true}, (error,  body ) =>{
    //     if (typeof body === 'undefined') {
    //         callback('Unable to connect to map services.', {});
    //         return;
    //     }
    //     var b = body.body;
        
    //     if(error){
    //          callback('Unable to connect to map services.', {});
    //     }
    //     else if(b.features.length === 0){
    //          callback('Address not found. Please try searching with another one.', {});
    //     }
    //     else {
    //         callback(undefined, {
    //             longitude: b.features[0].center[1],
    //             latitude: b.features[0].center[0],
    //             location: b.features[0].place_name
    //         })
    //     }
    // })
}

module.exports = {
    geocode: geocode
}

// const request = require('request')

// const geocode = (address, callbackGeocode) =>{
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWRpdHlhc2h1a2xhIiwiYSI6ImNrMzc2ZjdqNjAwaTMzYnBjNnk2ZjgwbWQifQ.rvT7sjy7r_fNA0Yr6touUQ&limit=1'
    
//     request({url: url, json:true}, (error, { body }) => {
//         if(error)
//         {
//             callbackGeocode('Unable to connect to location services!', undefined)
//         }
//         else if(body.features.length === 0){
//             callbackGeocode('Unable to find location!', undefined)
//         }
//         else{
            
//             callbackGeocode(undefined, {
//                     longitude: body.features[0].center[1],
//                     latitude: body.features[0].center[0],
//                     location: body.features[0].place_name
//             })
//         }
//     })
// }
// // geocode(123123, (error, data) => { // in second arg, destructured(es6) object is used
// //     if(error){
// //         return console.log(error)
// //     }
// //     else 
// //     {
// //         console.log(data)
// //     }
// // })

// module.exports = {
//     geocode: geocode
// }
// lib folder - javascript

// const request = require('request');  // npm i request
// const {promisify} = require('util');  // util is built in - no need for npm
// const promisifiedRequest = promisify(request);

const fetch = require('node-fetch');



require('dotenv').config()   // npm i dotenv


// const url = `https://api.openweathermap.org/data/2.5/weather?q=Tallinn,est&units=metric&appid=${process.env.APPID}`;
// const url = `https://api.openweathermap.org/data/2.5/weather?q=loc=${location},name=${countryCode}&units=metric&appid=${process.env.APPID}`;


async function getFetchWeather(location, countryCode) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},${countryCode}&units=metric&appid=${process.env.APPID}`;

    let data = await fetch(url, {method: 'GET'});
    return await data.json();
}



// const getFetchWeather = async (location, contryCode) => {
//     let data = await fetch(
//         url, 
//         {method: 'GET'});
//     return await data.json();
// }


module.exports = getFetchWeather;
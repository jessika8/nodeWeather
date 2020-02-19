
const request = require('request');  // npm i request
const {promisify} = require('util');  // util is built in - no need for npm
const promisifiedRequest = promisify(request);

// const fs = require('fs');

require('dotenv').config()   // npm i dotenv


const getWeather = async () => {

    let data = await promisifiedRequest({
        // uri: `https://api.openweathermap.org/data/2.5/weather?q=Tallinn,est&units=metric&appid=${process.env.APPID}`,
        uri: `https://api.openweathermap.org/data/2.5/weather?q=Tallinn,est&units=metric&appid=${process.env.APPID}`,
        json: true
    });
    
    //  fs.writeFileSync('weather.json',JSON.stringify(data.body, null, 6)) 
    //  this will create weather.json file
     
    // return the data rather than console.log it
    return data.body
    

}

getWeather();

// the json file data is readable now
// let content = fs.readFileSync('weather.json');
// content = JSON.parse(content)


//export the function to be run in index.js
module.exports = getWeather;
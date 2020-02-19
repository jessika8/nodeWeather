// importing things that we downloaded 
const hbs = require('express-handlebars');
const path = require('path');
const express = require('express');

const app = express();

 //import the getWeather function
 //using the fetch method 
const getWeather = require('./lib/fetchWeather');
// this is with require. it is depricated now -  start usimng fetch instead
// const getWeather = require('./lib/getWeather');


// use path to join these two paths
// dirname - directory name, full path to the folder we are in
// i,mages, css, javascript
app.use(express.static(path.join(__dirname, 'public')));
// console.log(__dirname)    ///Users/codenation/Desktop/node/wheaterFront


// to keep every pagae consistant, don't have to duplicate code
app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}))

// telling the express to use the engine
app.set('view engine', '.hbs');


//make the function asynchronous
app.get('/', async(req, res) => {

    let data = await getWeather();  //wait for the getWeather function to run and store it in the data variable
    let description = data.weather[0].description
    let locationName = data.name
    let countryCode = data.sys.country
    let temp = data.main.temp
    let feelsLike = data.main.feels_like
    console.log(data)
    // render the index.hbs page
    res.render('index', {description, locationName, countryCode, temp, feelsLike});
})

app.listen(3000, () => {
    console.log('server listening on port 3000')
})
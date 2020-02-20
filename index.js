// importing things that we downloaded 
const hbs = require('express-handlebars');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');  //import body-parser
const app = express();

 //import the getWeather function
 //using the fetch method 
const fetchWeather = require('./lib/fetchWeather');
// this is with require. it is depricated now -  start usimng fetch instead
// const getWeather = require('./lib/getWeather');


// use path to join these two paths
// dirname - directory name, full path to the folder we are in
// i,mages, css, javascript
app.use(express.static(path.join(__dirname, 'public')));
// console.log(__dirname)    ///Users/codenation/Desktop/node/wheaterFront
app.use(bodyParser.urlencoded({extended: false})); //Ignore data types and make everything a string
app.use(bodyParser.json());  // Parse data as JSON


// to keep every pagae consistant, don't have to duplicate code
// 
app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}))

// telling the express to use the engine
app.set('view engine', '.hbs');


app.get('/', (req, res) => {
    res.render('index');
})

// POST route for “/” that is being used in the form
app.post('/', async(req, res) => {
    let location  = req.body.location;   //Get the location from the requests body object
    let countryCode = req.body.countryCode
    console.log(location)
    let data = await fetchWeather(location, countryCode);

    console.log(data)
    if (data.cod !== '404') {

    let description = data.weather[0].description
    let locationName = data.name + ', '
    let countryCodeName = data.sys.country
    let temp = data.main.temp + ' C'
    let feelsLike = data.main.feels_like + ' C'
    let iconData = data.weather[0].icon
    let iconUrl = `http://openweathermap.org/img/wn/${iconData}@2x.png`
    let windSpeed = data.wind.speed + ' m/s'
    console.log(data)
    // render the index.hbs page
    // Send an object inside an object so that we can loop through the data
    //locationName, countryCodeName - I want to disply in the h1, not in the list, so it has to be outside the obdjec
    res.render('index', {data: {Temperature: temp, Feels: feelsLike, Wind: windSpeed, Description: description, }, iconUrl, locationName, countryCodeName});

    } else {
        res.render('index', {err: "The location you entered dosen't exist!"})
    }

})



//make the function asynchronous
// app.get('/', async(req, res) => {

//     let data = await getWeather();  //wait for the getWeather function to run and store it in the data variable
//     let description = data.weather[0].description
//     let locationName = data.name
//     let countryCode = data.sys.country
//     let temp = data.main.temp
//     let feelsLike = data.main.feels_like
//     console.log(data)
//     // render the index.hbs page
//     res.render('index', {description, locationName, countryCode, temp, feelsLike});
// })

app.listen(3000, () => {
    console.log('server listening on port 3000')
})
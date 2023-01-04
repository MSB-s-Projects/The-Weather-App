// importing express 
const express = require("express");
// importing https 
const https = require("https");
// importing body-parser 
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");


// Creating app using express 
const app = express();


// Creating port 
const port = 3000;


// creating a static folder to store data 
app.use(express.static("public"));
// using the bodyParser in urlEncoder mode 
app.use(bodyParser.urlencoded({extended:true}));


// get function for "/" route 
app.get("/", (req, res) => {
    // sending the index.html file back as response 
    res.sendFile(`${__dirname}/index.html`);
});

// post function for "/" route 
app.post("/", (req, res) => {
    
    // creating a constant to get data from the user for the city 
    const city = req.body.city;
    const apiKey = '3dd1fd3ddb3807bf3fdb7da1656cda91';
    const units = 'metric';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
    
    // creating a get request on openWeather api using https 
    https.get(url, (response) => {
        // getting the data as response to our request
        response.on("data", (data) => {
            // unpacking the data from the response into JSON format 
            const weatherData = JSON.parse(data);

            // Storing the temperature, weather description and weather icon 
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            // getting the weather icon url 
            const src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            // sending the requested data as response to the user 
            res.send(`<h2><h2 style='text-align:center;font-weight:normal;font-family:sans-serif;margin-top:7%;'>Current Weather Condition : ${weatherDesc}</h2><br><h1 style='text-align:center;font-family:sans-serif;margin-top:0;'>The current temperature in ${city} is : <span style='color:purple;'>${temp}°C</span></h1><div style='text-align:center;'><img src=${src}></div>`)
        })
    })

})


// Listening to the port 
app.listen(port, () => {
    // Console logging the server starting message 
    console.log(`Server started at port : ${port}`);
});
const {exec} = require('child_process');
const axios = require('axios');
var currentInterval;

var display = {
    model: "16x2c",
    currentDisplayView: '',
    temp: 0,
    feels_like: 0,
    humidity: 0,
    pressure: 0
}

module.exports = {
    print: function print(req) {
        return new Promise((resolve, reject) => {
            var msg = req.params.msg;

            clearInterval(currentInterval);

            var cmd = "python3 ./scripts/lcd.py '" + msg + "'";
            exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    console.log("Error: " + stderr);
                    reject();
                } else {
                    resolve();
                    currentDisplayView = 'custom message'
                }
            });
        })
    },
    weather: function weather(request) {
        return new Promise((resolve, reject) => {

            if(display.currentDisplayView == 'weather')
                resolve();
            else
                display.currentDisplayView = 'weather'

            let apiKey = "d272364289de081755defeaa6dea8795";
            let cityId = 6122091;
            let url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${apiKey}`
            
            resolve();

            const weatherTimeout = setInterval(() => {
                axios.get(url).then(res => {
                    var flag = false;

                    if (display.temp !=  Math.floor(res.data.main.temp)){
                        flag = true;
                        display.temp =  Math.floor(res.data.main.temp);
                    }

                    if(display.feels_like != Math.floor(res.data.main.feels_like)) {
                        flag = true;
                        display.feels_like = Math.floor(res.data.main.feels_like);
                    }

                    if(display.humidity != Math.floor(res.data.main.humidity)){
                        flag = true;
                        display.humidity = Math.floor(res.data.main.humidity);
                    }

                    if(display.pressure != res.data.main.preassure){
                        flag = true;
                        display.pressure = res.data.main.pressure;
                    }

                    if(flag)
                        internal_print(`T: ${display.temp} C (${display.feels_like} C)H: ${display.humidity}% P: ${display.pressure}`);
                
                })
                .catch(error => {
                    console.log(error)
                })
            }, 5000)

            resolve();
            currentInterval = weatherTimeout;
        });
    }
}

function internal_print(msg) {
    var cmd = "python3 ./scripts/lcd.py '" + msg + "'";
    exec(cmd);
}

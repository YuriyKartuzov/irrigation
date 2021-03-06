'use strict'
const {
    exec
} = require('child_process');
const axios = require('axios');
const fs = require('fs')

var display = {
    model: "16x2c",
    currentDisplayView: '',
    temp: 0,
    feels_like: 0,
    humidity: 0,
    pressure: 0,
    soil_sensors: [{
            name: "Sensor 1",
            macAddress: "8C:AA:B5:77:D4:75",
            in_min: 855, // air
            in_max: 400, // water
            value: 0,
            updated: 0
        },
        {
            name: "Sensor 2",
            macAddress: "8C:AA:B5:77:F4:3D",
            in_min: 855,
            in_max: 445,
            value: 0,
            updated: 0
        }
    ],
    currentInterval: ''

}

module.exports = {

    update_ESP8266: function update_ESP8266(req) {
        return new Promise((resolve, reject) => {

            var macAddress = req.params.moistureContent.split("=")[0];
            var moisture = req.params.moistureContent.split('=')[1];

            var out_max = 100;
            var out_min = 0;

            display.soil_sensors.forEach(el => {
                if (el.macAddress == macAddress) {
                    const mapMoisture = ((moisture - el.in_min) * (out_max - out_min) / (el.in_max - el.in_min)).toFixed(0);
                    el.value = mapMoisture;
                    el.updated = Date.now();

                    //console.log(macAddress + '=' + mapMoisture);
                    resolve();
                    return;
                }
            })
        })
    },

    // Print Soil Moisture sensors
    printESP8266: function printESP8266() {
        return new Promise((resolve, reject) => {

            if (display.currentDisplayView == 'sensors') {
                resolve();
                return;
            }

            clearInterval(display.currentInterval);
            display.currentDisplayView = 'sensors';

            const sensorTimeout = setInterval(() => {
                var msg_line2 = '';

                display.soil_sensors.forEach(el => {
                    if((Date.now() - el.updated) > 10000){
                        el.value = 0;
                        msg_line2 += "N/A".padEnd(5,' ');
                    }
                    else 
                        msg_line2 += (el.value + "%").padEnd(5,' ');
                });

                var msg_line1 = "S1:  S2:".padEnd(16, " ");
                internal_print(msg_line1 + msg_line2);

            }, 3000);

            resolve();
            display.currentInterval = sensorTimeout;
        });
    },

    print: function print(req) {
        return new Promise((resolve, reject) => {
            var msg = req.params.msg;

            clearInterval(display.currentInterval);

            var cmd = "python3 ./scripts/lcd.py '" + msg + "'";
            exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    console.log("Error: " + stderr);
                    reject();
                } else {
                    resolve();
                    display.currentDisplayView = 'custom message'
                }
            });
        })
    },

    // Print Weather information curteusy of openweathermap
    weather: function weather(request) {
        return new Promise((resolve, reject) => {

            if (display.currentDisplayView == 'weather') {
                resolve();
                return;
            }

            clearInterval(display.currentInterval);

            display.currentDisplayView = 'weather'
            let apiKey = '';
            try {
                apiKey = fs.readFileSync('./keys/weather.key');
            } catch (e) {
                reject("Weather Api key not found");
                return;
            }

            let cityId = 6122091;
            let url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${apiKey}`

            const weatherTimeout = setInterval(() => {
                axios.get(url).then(res => {
                        var flag = false;

                        if (display.temp != res.data.main.temp.toFixed(0)) {
                            flag = true;
                            display.temp = res.data.main.temp.toFixed(0);
                        }

                        if (display.feels_like != res.data.main.feels_like.toFixed(0)) {
                            flag = true;
                            display.feels_like = res.data.main.feels_like.toFixed(0);
                        }

                        if (display.humidity != res.data.main.humidity.toFixed(0)) {
                            flag = true;
                            display.humidity = res.data.main.humidity.toFixed(0);
                        }

                        if (display.pressure != res.data.main.preassure) {
                            flag = true;
                            display.pressure = res.data.main.pressure;
                        }

                        if (flag) {
                            let line1 = `T: ${display.temp} C (${display.feels_like} C)`;
                            let line2 = `H: ${display.humidity}% P: ${display.pressure}`;
                            line1 = line1.padEnd(16, ' ');

                            internal_print(line1 + line2);
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })
            }, 5000)

            resolve();
            display.currentInterval = weatherTimeout;
        });
    },

    startupScreen: function clearScreen(msg) {
        var cmd = `python3 ./scripts/lcd.py '${msg}'`;
        exec(cmd);
    }

}

function internal_print(msg) {
    var cmd = "python3 ./scripts/lcd.py '" + msg + "'";
    exec(cmd);
}
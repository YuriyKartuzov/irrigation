#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ESP8266HTTPClient.h>

#include <WiFiClient.h>

ESP8266WiFiMulti WiFiMulti;

// Soil Moisture sensor
int analogInPin = A0; 
int sensorValue = 0; 
int outputValue = 0;
String message;

void setup()
{
    Serial.begin(115200); //Baud rate
    pinMode(LED_BUILTIN, OUTPUT);
    Serial.flush();
    delay(2000);

    WiFi.mode(WIFI_STA);
    WiFiMulti.addAP("SSID", "PASSWORD");

    pinMode(LED_BUILTIN, OUTPUT);
    
}

void loop()
{
    if ((WiFiMulti.run() == WL_CONNECTED))
    {
        digitalWrite(LED_BUILTIN, LOW);
        WiFiClient client;
        HTTPClient http;

        // Soil Moisture
        sensorValue = analogRead(analogInPin);
        outputValue = map(sensorValue, 395, 805, 100, 0);

        message = WiFi.macAddress() + "=" + String(outputValue);
        //Serial.println(message);

        if (http.begin(client, "http://192.168.0.99/soil/" + message))
        { 
            // start connection and send HTTP header
            int httpCode = http.GET();
            http.end();
        }
    }

    digitalWrite(LED_BUILTIN, HIGH);
    delay(1000);
}
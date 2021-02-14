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
    WiFiMulti.addAP("Kartz", "wasaga2020");
}

void loop()
{
    digitalWrite(LED_BUILTIN, LOW);
    
    if ((WiFiMulti.run() == WL_CONNECTED))
    {

        WiFiClient client;
        HTTPClient http;

        // Debug message
        //Serial.println(WiFi.macAddress() + "=" + analogRead(analogInPin));

        if (http.begin(client, "http://192.168.0.99/soil/" + WiFi.macAddress() + "=" + analogRead(analogInPin)))
         { 
            int httpCode = http.GET();
            http.end();
         }

    }

    digitalWrite(LED_BUILTIN, HIGH);
    delay(10000); // every 30 seconds
}
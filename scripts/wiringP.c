// DHT22 Humidity and Temperature sensor
// COMPILE: gcc sensor.c -o sensor.exe -lwiringPi

#include <wiringPi.h> 
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

#define MAX_TIMINGS 85      // Takes 84 state changes to transmit data
#define DHT_PIN 7           // Map to proper physical pin. Run command: `gpio readall`

int main(int argc, char *arv[])
{
    if (wiringPiSetup() == -1)
        exit(1);

    // Sensor data
    int data[5] = {0, 0, 0, 0, 0};

    uint8_t lastState = HIGH;
    uint8_t stateDuration = 0;
    uint8_t stateChanges = 0;
    uint8_t bitsRead = 0;

    float humidity = 0.0;
    float temperature = 0.0;

    /* Handshake */
    pinMode(DHT_PIN, OUTPUT);
    digitalWrite(DHT_PIN, HIGH);
    delay(10);
    digitalWrite(DHT_PIN, LOW);
    delay(1.5);
    digitalWrite(DHT_PIN, HIGH);
    delayMicroseconds(1);
    pinMode(DHT_PIN, INPUT);

    for (stateChanges = 0, stateDuration = 0; (stateChanges < MAX_TIMINGS) && (stateDuration < 255); stateChanges++)
    {
        stateDuration = 0;

        while ((digitalRead(DHT_PIN) == lastState) && (stateDuration < 255))
        {
            stateDuration++;
            // IMPORTANT. Function required adjustment from default to show data. Try values 1 - 10.
            delayMicroseconds(3); 
        };

        lastState = digitalRead(DHT_PIN);

        // Count IGNORE: First 2 state changes are sensor signaling ready to send.
        // Count IGNORE: Each bit is preceeded by a state change to mark its beginning.
        if ((stateChanges > 2) && (stateChanges % 2 == 0))
        {
            // 40 bits indexing produces: 0000000011111111222222223333333344444444
            data[bitsRead / 8] <<= 1; // Each array element has 8 bits.  Shift Left 1 bit.
            if (stateDuration > 16)   // A State Change > 16 microseconds is a '1'.
                data[ bitsRead / 8 ] |= 0b00000001;
            bitsRead++;
        }
    }

    if (bitsRead < 40)
    {
        fprintf(stderr, "Read %d bits instead of 40.\n", bitsRead);
        return -1;
    }
    else if (data[4] != ((data[0] + data[1] + data[2] + data[3]) & 0xFF))
    {
        fprintf(stderr, "Checksum test does not pass.\n", bitsRead);
        return -1;
    }

    /* Main calculation and output */
    humidity = (float)((data[0] << 8) + data[1]) / 10.0;
    temperature = abs((float)((data[2] << 8) + data[3]) / 10.0); // Celcius

    printf("T:%.1fC,H:%.0f%%\n", temperature, humidity);

    return 0;
}
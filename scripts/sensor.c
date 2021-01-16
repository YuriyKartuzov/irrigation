// DHT22 Humidity and Temperature sensor
// COMPILE: gcc sensor.c -o sensor.exe -lpigpio

#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <pigpio.h>

#define MAX_TIMINGS 85      // Takes 84 state changes to transmit data
#define GPIO_PIN 4          // `pigpio` library mapping http://abyz.me.uk/rpi/pigpio/index.html

int main(int argc, char *arv[])
{
    if (gpioInitialise() < 0)
        exit(1); 
    
    // Sensor data
    int data[5] = {0, 0, 0, 0, 0};

    uint8_t lastState = PI_HIGH;
    uint8_t stateDuration = 0;
    uint8_t stateChanges = 0;
    uint8_t bitsRead = 0;

    float humidity = 0.0;
    float temperature = 0.0;

    /* Handshare */
    gpioSetMode(GPIO_PIN, PI_OUTPUT);
    gpioWrite(GPIO_PIN, PI_HIGH); // Set initial state, to override default pin pull
    gpioDelay(1500);
    gpioWrite(GPIO_PIN, PI_LOW); // Pulling down signals to sensor
    gpioDelay(1500);
    gpioSetMode(GPIO_PIN, PI_INPUT);
    gpioDelay(30);

    // Main loop for getting 40 bits of data
    for (stateChanges = 0, stateDuration = 0; (stateChanges < MAX_TIMINGS) && (stateDuration < 255); stateChanges++)
    {
        stateDuration = 0;

        while ((gpioRead(GPIO_PIN) == lastState) && (stateDuration < 255)) 
        {
            stateDuration++;
            // IMPORTANT. Function required adjustment from default to show data. Try values 1 - 10.
            gpioDelay(2);
        };

        lastState = gpioRead(GPIO_PIN);

        // Count IGNORE: First 2 state changes are sensor signaling ready to send.
        // Count IGNORE: Each bit is preceeded by a state change to mark its beginning.
        if (stateChanges < 3 || stateChanges % 2 != 0)
            continue;
    
        // Recodring 40 bits to data arrays
        data[bitsRead / 8] <<= 1; // Each array element has 8 bits.  Shift Left 1 bit.
        if (stateDuration > 16)   // A St`ate Change > 16 microseconds is a '1'.
            data[ bitsRead / 8 ] |= 0b00000001;
        bitsRead++;
    }

    // Error checking
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
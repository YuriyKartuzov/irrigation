// gcc ./scripts/relaydriver.c -o ./scripts/relaydriver.exe -lpigpio -lrt -lpthread

#include <stdio.h>
#include <stdlib.h>
#include <pigpio.h>

int main(int argc, char *argv[])
{

    if (argc != 2)
    {
        printf("wrong input\n");
        return 1;
    }

    int relayNum = atoi(argv[1]);
    if (relayNum < 1 || relayNum > 40)
    {
        printf("wrong input");
        return 1;
    }

    // Initialize PI GPIO
    if (gpioInitialise() < 0)
    {
        fprintf(stderr, "pigio intialisation failed\n");
        return 1;
    }

    // Set GPIO Mode - always OUTPUT for relay drivers
    gpioSetMode(relayNum, PI_OUTPUT);

    int currentState = gpioRead(relayNum);
    if (currentState == 0)
    {
        gpioWrite(relayNum, 1);
        printf("ON");
    }
    else if (currentState == 1)
    {
        gpioWrite(relayNum, 0);
        printf("OFF");
    }
    else
    {
        fprintf(stderr, "Relay status could not be read\n");
        return 1;
    }

    return 0;
}
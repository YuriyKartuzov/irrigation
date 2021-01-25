// COMPILE: gcc ./scripts/statusdriver.c -o ./scripts/statusdriver.exe -lpigpio -lrt -lpthread

#include <stdio.h>
#include <stdlib.h>
#include <pigpio.h> 

int main(int argc, char *argv[])
{
    if( argc != 2 ) {
        printf("wrong input\n");
        return 1; 
    }

    int relayNum = atoi(argv[1]);
    if (relayNum < 1 && relayNum > 8 ) {
        printf("wrong input");
        return 1;
    }

    // Initialize PI GPIO
    if (gpioInitialise() < 0){
        fprintf(stderr, "pigio intialisation failed\n");
        return 1;
    }

    // Set GPIO Mode - always OUTPUT for relay drivers
    gpioSetMode(relayNum, PI_OUTPUT);

    // Printing status  ON or OFF to standard output
    int response = gpioRead(relayNum);
    if(response == 1)
        printf("ON");
    else
        printf("OFF");    

    return 0;
}
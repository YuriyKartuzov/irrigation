// gcc relaydriver.c -o relaydriver -lpigpio -lrt -lpthread

#include <stdio.h>
#include <stdlib.h>
#include <pigpio.h>

int main (int argc, char * argv[]){

    // Initialize PI GPIO
	if( gpioInitialise() < 0 ){
		fprintf(stderr, "pigio intialisation failed\n");
		return 1;
	} 

    // Checking input
    int relayNum = atoi(argv[1]);
    if(argc != 2 || relayNum == 0) {
        printf("wrong input\n");
        return 1;
    }

	gpioSetMode(relayNum, PI_OUTPUT);
    if(gpioRead(relayNum) == 0 )
        gpioWrite(relayNum, 1);
    else
    	gpioWrite(relayNum, 0);
}
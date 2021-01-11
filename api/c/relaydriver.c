// gcc -o relaydriver relaydriver.c -lpigpio -lrt -lpthread

#include <stdio.h>
#include <pigpio.h>

int main (int argc, char * argv[]){
	if( gpioInitialise() < 0 ){
		fprintf(stderr, "pigio intialisation failed\n");
		return 1;
	} 

	gpioSetMode(9, PI_OUTPUT);
	gpioWrite(9, 1);
}
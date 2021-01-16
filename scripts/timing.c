// COMPILE: gcc test.c -o test.exe -lpigpio

#include <stdio.h>
#include <stdlib.h>
#include <pigpio.h>
#include <time.h>

int main(int argc, char *argv[]){

    clock_t begin = clock();
    gpioInitialise();
    printf("gpio took %f seconds to initialize\n", (double)(clock() - begin)/ CLOCKS_PER_SEC);

}


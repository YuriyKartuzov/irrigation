#!/usr/bin/python
# https://rplcd.readthedocs.io/en/stable/getting_started.html
# INSTALL:          sudo pip3 install RPLCD
# ADDRESS (0x27):   i2cdetect -y 1 
# RUN eg1:          python3 lcd.py "Temp: 21.0C     IP: 192.168.0.99"
# RUN eg2:          python3 lcd.py "clear"

from RPLCD.i2c import CharLCD
import sys

lcd = CharLCD(i2c_expander='PCF8574', address=0x27, port=1,
              cols=16, rows=4, dotsize=8,
              charmap='A02',
              auto_linebreaks=True,
              backlight_enabled=True)

if sys.argv[1] == "clear":
    lcd.clear()
else:
    lcd.write_string(sys.argv[1])



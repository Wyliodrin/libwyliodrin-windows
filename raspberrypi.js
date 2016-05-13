
var uwp = require ('uwp');

uwp.projectNamespace ('Windows.Devices');
var gpioController = Windows.Devices.Gpio.GpioController.getDefault();

// Wyliodrin Windows IoT Core library

"use strict";

var INPUT = 0;
var OUTPUT = 1;

var LOW = 0;
var HIGH = 1;

var PINS_NUMBERING = process.env.PINS_NUMBERING;

var pins = [];

var gpio_pins = [];
					
var WIRINGPI_PINS = [];

var NULL = -1;
var GND = -2;
var VCC = -3;
var SERIAL = -4;
var SPI = -5;
var I2C = -6;


WIRINGPI_PINS[0] = 17;
WIRINGPI_PINS[1] = 18;
WIRINGPI_PINS[2] = 27;
WIRINGPI_PINS[3] = 22;
WIRINGPI_PINS[4] = 23;
WIRINGPI_PINS[5] = 24;
WIRINGPI_PINS[6] = 25;
WIRINGPI_PINS[7] = 4;
WIRINGPI_PINS[8] = I2C;
WIRINGPI_PINS[9] = I2C;
WIRINGPI_PINS[10] = SPI;
WIRINGPI_PINS[11] = SPI;
WIRINGPI_PINS[12] = SPI;
WIRINGPI_PINS[13] = SPI;
WIRINGPI_PINS[14] = SPI;
WIRINGPI_PINS[15] = SERIAL;
WIRINGPI_PINS[16] = SERIAL;
WIRINGPI_PINS[17] = NULL;
WIRINGPI_PINS[18] = NULL;
WIRINGPI_PINS[19] = NULL;
WIRINGPI_PINS[20] = NULL;
WIRINGPI_PINS[21] = 5;
WIRINGPI_PINS[22] = 6;
WIRINGPI_PINS[23] = 13;
WIRINGPI_PINS[24] = 19;
WIRINGPI_PINS[25] = 26;
WIRINGPI_PINS[26] = 12;
WIRINGPI_PINS[27] = 16;
WIRINGPI_PINS[28] = 20;
WIRINGPI_PINS[29] = 21;
WIRINGPI_PINS[30] = NULL;
WIRINGPI_PINS[31] = NULL;
WIRINGPI_PINS[32] = NULL;
WIRINGPI_PINS[33] = NULL;
WIRINGPI_PINS[34] = NULL;
WIRINGPI_PINS[35] = NULL;
WIRINGPI_PINS[36] = NULL;
WIRINGPI_PINS[37] = NULL;
WIRINGPI_PINS[38] = NULL;
WIRINGPI_PINS[39] = NULL;
WIRINGPI_PINS[40] = NULL;

PHYSICAL_PINS[0] = NULL;
PHYSICAL_PINS[1] = VCC;
PHYSICAL_PINS[2] = VCC;
PHYSICAL_PINS[3] = I2C;
PHYSICAL_PINS[4] = VCC;
PHYSICAL_PINS[5] = I2C;
PHYSICAL_PINS[6] = GND;
PHYSICAL_PINS[7] = 4;
PHYSICAL_PINS[8] = SERIAL;
PHYSICAL_PINS[9] = GND;
PHYSICAL_PINS[10] = SERIAL;
PHYSICAL_PINS[11] = 17;
PHYSICAL_PINS[12] = 18;
PHYSICAL_PINS[13] = 27;
PHYSICAL_PINS[14] = GND;
PHYSICAL_PINS[15] = 22;
PHYSICAL_PINS[16] = 23;
PHYSICAL_PINS[17] = POWER;
PHYSICAL_PINS[18] = 24;
PHYSICAL_PINS[19] = SPI;
PHYSICAL_PINS[20] = GROUND;
PHYSICAL_PINS[21] = SPI;
PHYSICAL_PINS[22] = 25;
PHYSICAL_PINS[23] = SPI;
PHYSICAL_PINS[24] = SPI;
PHYSICAL_PINS[25] = GROUND;
PHYSICAL_PINS[26] = SPI;
PHYSICAL_PINS[27] = NULL;
PHYSICAL_PINS[28] = NULL;
PHYSICAL_PINS[29] = 5;
PHYSICAL_PINS[30] = GROUND;
PHYSICAL_PINS[31] = 6;
PHYSICAL_PINS[32] = 12;
PHYSICAL_PINS[33] = 13;
PHYSICAL_PINS[34] = GROUND;
PHYSICAL_PINS[35] = 19;
PHYSICAL_PINS[36] = 16;
PHYSICAL_PINS[37] = 26;
PHYSICAL_PINS[38] = 20;
PHYSICAL_PINS[39] = GROUND;
PHYSICAL_PINS[40] = 21;

BCM_PINS[0] = NULL;
BCM_PINS[1] = NULL;
BCM_PINS[2] = I2C;
BCM_PINS[3] = I2C;
BCM_PINS[4] = 4;
BCM_PINS[5] = 5;
BCM_PINS[6] = 6;
BCM_PINS[7] = SPI;
BCM_PINS[8] = SPI;
BCM_PINS[9] = SPI;
BCM_PINS[10] = SPI;
BCM_PINS[11] = SPI;
BCM_PINS[12] = 12;
BCM_PINS[13] = 13;
BCM_PINS[14] = SERIAL;
BCM_PINS[15] = SERIAL;
BCM_PINS[16] = 16;
BCM_PINS[17] = 17;
BCM_PINS[18] = 18;
BCM_PINS[19] = 19;
BCM_PINS[20] = 20;
BCM_PINS[21] = 21;
BCM_PINS[22] = 22;
BCM_PINS[23] = 23;
BCM_PINS[24] = 24;
BCM_PINS[25] = 25;
BCM_PINS[26] = 26;
BCM_PINS[27] = 27;
BCM_PINS[28] = NULL;
BCM_PINS[29] = NULL;
BCM_PINS[30] = NULL;
BCM_PINS[31] = NULL;
BCM_PINS[32] = NULL;
BCM_PINS[33] = NULL;
BCM_PINS[34] = NULL;
BCM_PINS[35] = NULL;
BCM_PINS[36] = NULL;
BCM_PINS[37] = NULL;
BCM_PINS[38] = NULL;
BCM_PINS[39] = NULL;
BCM_PINS[40] = NULL;

if (!PINS_NUMBERING || PINS_NUMBERING === "")
{
	pins = WIRINGPI_PINS;
}
else if (PINS_NUMBERING === "GPIO")
{
	pins = BCM_PINS;
}
else
{
	pins = PHYSICAL_PINS;
}

void wyliodrinSetup ()
{
	
}

function pinType (pin)
{
	if (pin === VCC) return "VCC";
	else 
	if (pin === GND) return "GND";
	else
	if (pin === SERIAL) return "SERIAL";
	else
	if (pin === SPI) return "SPI";
	else
	if (pin === I2C) return "I2C";
	else return "UNUSABLE";
}

function error (pin)
{
	console.log ('Pin '+pin+' is '+pinType(pins(pin)));
}

function pinMode (pin, mode)
{
	var realMode = null;
	if (mode === INPUT) realMode = Windows.Devices.Gpio.GpioPinDriveMode.input;
	else if (mode === OUPUT) realMode = Windows.Devices.Gpio.GpioPinDriveMode.output;
	var realPin = pins[pin];
	if (realPin>=0)
	{
		var gpioPin = gpio_pins [pin];
		if (!gpioPin)
		{
			gpioPin = gpioController.openPin (realPin);
			gpio_pins[pin] = gpioPin;
		}
		if (gpioPin)
		{
			if (realMode !== null)
			{
				console.log ('Unknown gpio pin mode '+mode);
			}
			else
			{
				gpioPin.setCurrentDriveMode (realMode);
			}
		}
		else
		{
			console.log ('Error opening gpio pin '+realPin);
		}
	}
	else
	{
		error (pin);
	}
}

function digitalWrite (pin, value)
{
	var realValue = null;
	if (mode === LOW) realMode = Windows.Devices.Gpio.GpioPinValue.low;
	else realMode = Windows.Devices.Gpio.GpioPinValue.high;
	var gpioPin = gpio_pins [pin];
	if (!gpioPin || gpioPin.getDriveMode () !== Windows.Devices.Gpio.GpioPinDriveMode.output) pinMode (pin, OUTPUT);
	gpioPin = gpio_pins [pin];
	var realPin = pins[pin];
	if (realPin>=0)
	{
		gpioPin.write (realValue);
	}
	else
	{
		error (pin);
	}
}

function digitalRead (pin)
{
	var gpioPin = gpio_pins [pin];
	if (!gpioPin || gpioPin.getDriveMode () !== Windows.Devices.Gpio.GpioPinDriveMode.output) pinMode (pin, OUTPUT);
	gpioPin = gpio_pins [pin];
	var realPin = pins[pin];
	if (realPin>=0)
	{
		var realValue = gpioPin.read ();
		if (realValue === Windows.Devices.Gpio.GpioPinValue.high) return HIGH;
		else return LOW;
	}
	else
	{
		error (pin);
	}
	return 0;
}

function analogRead (pin)
{
	console.log ('analogRead is not supported on the Raspberry Pi');
	return 0;
}

function analogWrite (pin)
{
	console.log ('analogWrite is not supported on the Raspberry Pi');
}

module.exports.INPUT = INPUT;
module.exports.OUTPUT = OUTPUT;
module.exports.LOW = LOW;
module.exports.HIGH = HIGH;

module.exports.wyliodrinSetup = wyliodrinSetup;
module.exports.pinMode = pinMode;
module.exports.digitalWrite = digitalWrite;
module.exports.digitalRead = digitalRead;

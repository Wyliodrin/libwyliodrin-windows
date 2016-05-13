
"use strict";

var _ = require ('lodash');

var wyliodrin = {
	INPUT: 0,
	OUTPUT: 1,
	LOW: 0,
	HIGH: 1,
	pinMode: function (pin, mode) {},
	digitalWrite: function (pin, value) {},
	digitalRead: function (pin) {},
	analogWrite: function (pin, value) {},
	analogRead: function (pin) {}
};

var RASPBERRYPI = 1;
var DRAGONBOARD = 2;

var device = RASPBERRYPI;

if (device === RASPBERRYPI)
{
	wyliodrin = _.assign (wyliodrin, require ('./raspberrypi.js'));
}
else
if (device === RASPBERRYPI)
{
	wyliodrin = _.assign (wyliodrin, require ('./dragonboard.js'));
}

module.exports = wyliodrin;
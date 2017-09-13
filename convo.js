/*  
	Created on Sep 12, 2017 by @rocantero
	Convo is intended to subtly convert between imperial and metric quantities 
	without disrupting (too much) the webpages' styling
*/

// Conversions
// There's repetition for simplicity's sake. Eval() is used to allow complex formulae.
var unitMapping = {
  'mph': { unit: 'km/h', formula: 'x * 1.609' },
  'lbs': { unit: 'kg', formula: 'x * 0.45' },
  'pounds': { unit: 'kg', formula: 'x * 0.45' },
  '°F': { unit: '°C', formula: '(x - 32) * .5556'} 
};

// 
var regexp = new RegExp('(\-?\d*) ?(' + Object.keys(unitMapping).join('|') + ')', 'g');

function calculate (x, formula) {
	return Math.round(eval(formula) * 100) / 100;
}

var replaceFunction = function(match, value, unit){
	var nvalue =  calculate(value, unitMapping[unit].formula);
  	var span = '<span style="border-bottom: 2px dotted #ff5300; cursor: help;" title="'+ nvalue + 
  		unitMapping[unit].unit +'">'+ value + ' ' + unit + '</span>'
  	return span;
};

var replaceNode = document.querySelector('body');
replaceNode.innerHTML = replaceNode.innerHTML.replace(regexp, replaceFunction);

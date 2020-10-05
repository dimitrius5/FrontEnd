'use strict';

const appConv = {
    conversions: conversions,
    units: undefined,
    convert_to: undefined,
    
    init: function(units, convert_to) {
        this.units = units;
        this.convert_to = convert_to;
        this.fillConversions();
    },
    fillConversions: function() {
        this.units.innerHTML = '';   
        this.convert_to.innerHTML = '';
        for(const conversion in conversions) {
            this.units.append(new Option(conversion, conversion));
            this.convert_to.append(new Option(conversion, conversion));
        }
    },
    calc: function(input) {
        const meters = conversions[input.unit] * input.value;
        const target = meters / conversions[input.convert_to];
        return {unit: input.convert_to, value: target};
    },

    addConversion: function(conversion) {
        conversions[conversion.unit] = conversion.value;
        this.fillConversions();
    }
}
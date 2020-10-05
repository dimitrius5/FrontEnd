'use strict';

class MobilePhone {
    constructor(brand, series) {
        this.brand = brand;
        this.series = series;
    }
    call(number) {
        console.log('calling ' + number);
    }
    sms(text) {
        console.log('sending ' + text);
    }
}

class Smartphone extends MobilePhone {
    constructor(brand, series) {
        super(brand, series);
    }
    openMap(location) {
        console.log('opening map of ' + location);
    }
}

class Tablet extends MobilePhone {
    constructor(brand, series) {
        super(brand, series);
    }
    setGuestMode() {
        console.log('switching to guest mode');
    }
}

const smartphone = new Smartphone('HTC', '10');
smartphone.call('+3809999999');
smartphone.openMap('Dnipro');

const tablet = new Tablet('Samsung', 'Galaxy Tab S6');
tablet.setGuestMode();
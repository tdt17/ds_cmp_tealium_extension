function _getAdobeObject() {
    let adobeObject = {};
    // Check if global variables contain the Adobe object or something else.
    if (window.s && window.s.version) {
        adobeObject = window.s;
    } else if (window.cmp && window.cmp.version) {
        adobeObject = window.cmp;
    }
    return adobeObject;
}

const s = _getAdobeObject();

const _myCW = {

    leadingZero: function(num) {
        return num < 10 ? '0' + num.toString() : num.toString();

    },

    getWeek: function(date) {
        const oneJan = new Date(date.getFullYear(),0,1);
        const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
        return this.leadingZero(Math.ceil(( date.getDay() + 1 + numberOfDays) / 7));
    },

    getYear: function(date) {
        const dow = date.getDate() - date.getDay() + 1;
        const newDate = new Date(date.setDate(dow));
        return newDate.getFullYear().toString();
    },

    getDayOfWeek: function(date, day) {
        const dow = date.getDate() - date.getDay() + day;
        const newDate = new Date(date.setDate(dow));
        return this.leadingZero(newDate.getMonth()+1) + '.' + this.leadingZero(newDate.getDate());
    },


    getCW: function(date) {
        //const currentDate = new Date();
        return 'CW' + ' ' 
        + this.getWeek(date) + ' ' 
        + this.getYear(date) + '.' 
        + this.getDayOfWeek(date, 1) + '.' + ' - ' 
        + this.getDayOfWeek(date, 7) + '.';
        
    },

};

if (typeof exports === 'object') {
    // Export s-object with all functions for unit testing
    module.exports = _myCW;
} 

s._myCW = _myCW;
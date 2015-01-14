// HomeKit types required
var types = require("./types.js");
var exports = module.exports = {};

// REQUIRES wiringPi!
//
// cd
// git clone git://git.drogon.net/wiringPi
// cd wiringPi
// ./build

var toggleRelay = function(){
    var exec = require('child_process').exec;
    exec('gpio write 7 0', function (error, stdout, stderr) {
        setTimeout(function(){
            exec('gpio write 7 1', function (error, stdout, stderr) {});
        }, 1000);
    });    
};

var execute = function(accessory,characteristic,value){ 
    var characteristic = characteristic.toLowerCase();

    if(characteristic == 'current state'){
        console.log('TODO: current state');
    }
    else if(characteristic == 'target state'){
        if(value == 1){ // Close
            toggleRelay();
        }
        else if(value == 0){ // Open
            toggleRelay();
        }
    }
    else if(characteristic == 'obstruction detected'){
        console.log('TODO: obstruction detection');
    }
 
    console.log("executed accessory: " + accessory + ", and characteristic: " + characteristic + ", with value: " +  value + ".");
};

exports.accessory = {
  displayName: "Garage Door Opener",
  username: "AC:42:3E:FE:5E:42",
  pincode: "031-45-154",
  services: [{
    sType: types.ACCESSORY_INFORMATION_STYPE, 
    characteristics: [{
        cType: types.NAME_CTYPE, 
        onUpdate: null,
        perms: ["pr"],
        format: "string",
        initialValue: "Garage Door Opener",
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Name of the accessory",
        designedMaxLength: 255    
    },{
        cType: types.MANUFACTURER_CTYPE, 
        onUpdate: null,
        perms: ["pr"],
        format: "string",
        initialValue: "Brian",
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Manufacturer",
        designedMaxLength: 255    
    },{
        cType: types.MODEL_CTYPE,
        onUpdate: null,
        perms: ["pr"],
        format: "string",
        initialValue: "Rev-1",
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Model",
        designedMaxLength: 255    
    },{
        cType: types.SERIAL_NUMBER_CTYPE, 
        onUpdate: null,
        perms: ["pr"],
        format: "string",
        initialValue: "A1S2NASF88EW",
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "SN",
        designedMaxLength: 255    
    },{
        cType: types.IDENTIFY_CTYPE, 
        onUpdate: null,
        perms: ["pw"],
        format: "bool",
        initialValue: false,
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Identify Accessory",
        designedMaxLength: 1    
    }]
  },{
    sType: types.GARAGE_DOOR_OPENER_STYPE, 
    characteristics: [{
        cType: types.NAME_CTYPE,
        onUpdate: null,
        perms: ["pr"],
        format: "string",
        initialValue: "Garage Door Opener Control",
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Name of service",
        designedMaxLength: 255   
    },{
        cType: types.CURRENT_DOOR_STATE_CTYPE,
        onUpdate: function(value) { console.log("Change:",value); execute("Garage Door", "Current State", value); },
        perms: ["pr","ev"],
        format: "int",
        initialValue: 0,
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "BlaBla",
        designedMinValue: 0,
        designedMaxValue: 4,
        designedMinStep: 1,
        designedMaxLength: 1    
    },{
        cType: types.TARGET_DOORSTATE_CTYPE,
        onUpdate: function(value) { console.log("Change:",value); execute("Garage Door", "Target State", value); },
        perms: ["pr","pw","ev"],
        format: "int",
        initialValue: 0,
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "BlaBla",
        designedMinValue: 0,
        designedMaxValue: 1,
        designedMinStep: 1,
        designedMaxLength: 1    
    },{
        cType: types.OBSTRUCTION_DETECTED_CTYPE,
        onUpdate: function(value) { console.log("Change:",value); execute("Garage Door", "Obstruction Detected", value); },
        perms: ["pr","ev"],
        format: "bool",
        initialValue: false,
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "BlaBla",
    }]
  }]
}
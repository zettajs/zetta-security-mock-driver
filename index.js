var Device = require('zetta-device');
var util = require('util');

var Security = module.exports = function() {
  Device.call(this);
};
util.inherits(Security, Device);

Security.prototype.init = function(config) {
  config
    .name('Security')
    .state('disarmed')
    .type('security')
    .when('disarmed', {allow: ['arm-stay', 'arm-away']})
    .when('armed-stay', {allow: ['disarm']})
    .when('armed-away', {allow: ['disarm']})
    .when('arming-stay', {allow: []})
    .when('arming-away', {allow: []})
    .when('disarming', {allow: []})
    .map('arm-stay', this.armStay)
    .map('arm-away', this.armAway)
    .map('disarm', this.disarm);
};

Security.prototype.armStay = function(cb) {
  
  this.state = 'arming-stay';
  cb();

  var self = this;
  setTimeout(function(){
    self.state = 'armed-stay';
    cb();
  }, 500);

}

Security.prototype.armAway = function(cb) {

  this.state = 'arming-away';
  cb();

  var self = this;
  setTimeout(function(){
    self.state = 'armed-away';
    cb();
  }, 500);

}

Security.prototype.disarm = function(cb) {

  this.state = 'disarming';
  cb();

  var self = this;
  setTimeout(function(){
    self.state = 'disarmed';
    cb();
  }, 500);

}
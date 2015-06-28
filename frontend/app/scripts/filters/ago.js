'use strict';

/**
 * @ngdoc filter
 * @name startyApp.filter:Ago
 * @function
 * @description
 * # Ago
 * Filter in the startyApp.
 */
angular.module('startyApp')
  .filter('ago', function () {
    return function(isodate){
      return moment(isodate).fromNow();
    };
  })
  .filter('time', function () {
    return function(isodate){
      var date = new Date(isodate);
      return date.toLocaleTimeString();
    };
  })
  .filter('minutes', function () {
    return function(minutes){
      if (minutes > 60) {
        var hours = Math.floor(minutes / 60);
        var minutes = minutes - (hours * 60);

        if (minutes == 0) {
          return hours + ' hours';
        } else {
          return hours + ' hours and ' + minutes + ' minutes';
        }
      } else {
        return minutes + ' minutes';
      }
    };
  });

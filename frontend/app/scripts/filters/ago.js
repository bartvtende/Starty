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
  });

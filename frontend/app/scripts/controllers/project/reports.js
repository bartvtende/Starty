'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:ReportsCtrl
 * @description
 * # ReportsCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('ReportsCtrl', function ($scope) {

        $scope.refreshGraph = function() {
            console.log('Refresh graph initiated!');
        };

    });

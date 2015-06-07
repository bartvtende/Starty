'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
    .controller('JoinCtrl', function ($scope) {

        $scope.accept = function() {
            console.log('The invite has been accepted.');
        };

        $scope.decline = function() {
            console.log('The invite has been declined.');
        };

    });

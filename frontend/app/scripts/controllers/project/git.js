'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:GitCtrl
 * @description
 * # GitCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
    .controller('GitCtrl', function ($scope, $auth) {

        $scope.authenticate = function (provider) {
            $auth.authenticate(provider);
        };

    });

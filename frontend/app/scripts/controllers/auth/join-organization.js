'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
    .controller('JoinCtrl', function ($scope, $state, $mdToast) {

        $scope.accept = function() {
            console.log('The invite has been accepted.');
            $state.go('overview.overview');
            $mdToast.show(
                $mdToast.simple()
                    .content('The project has been added to your projects!')
                    .position('bottom left')
                    .hideDelay(3000)
            );
        };

        $scope.decline = function() {
            console.log('The invite has been declined.');
        };

    });

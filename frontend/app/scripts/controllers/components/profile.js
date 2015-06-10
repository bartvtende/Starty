'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
    .controller('ProfileCtrl', function ($scope, $mdDialog, $state, $auth, $mdToast) {

        $scope.logout = function() {
            $auth.logout()
                .then(function() {
                    $scope.cancel();
                    $mdToast.show(
                        $mdToast.simple()
                            .content('You are now logged out!')
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                });
        };

        $scope.navigateTo = function(to) {
            $mdDialog.hide();
            $state.go(to);
        };

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    });

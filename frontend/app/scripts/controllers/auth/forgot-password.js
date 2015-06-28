'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
    .controller('ForgotPasswordCtrl', function ($scope, $mdToast, ForgotPasswordData, $state) {

        $scope.forgotPassword = function (user) {
            ForgotPasswordData.forgotPassword(user)
                .error(function (err) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content(err.error)
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                })
                .success(function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('You password has been changed!')
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                    $scope.user.email = '';
                    $scope.user.old_password = '';
                    $scope.user.new_password = '';
                    $scope.user.new_password_confirmation = '';
                    $state.go('auth.login');
                })
        };

    });

'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
    .controller('GithubProviderCtrl', function ($scope, $state, $stateParams) {

        $scope.$watch('$viewContentLoaded', function () {
            $scope.authenticateGithub();
        });

        $scope.authenticateGithub = function() {
            if($stateParams.code == null) {
                console.log('Empty code!');
                $state.go('overview.overview');
            }
        }

    });

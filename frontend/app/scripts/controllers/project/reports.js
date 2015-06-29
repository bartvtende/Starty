'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:ReportsCtrl
 * @description
 * # ReportsCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
    .controller('ReportsCtrl', function ($scope, GraphData, BoardData, $mdToast) {

    	$scope.chart = {};

        $scope.$watch('$viewContentLoaded', function () {
            $scope.loadProject();
        });

        $scope.loadProject = function () {
            $scope.$watchGroup(['project', 'user'], function (values) {
                if (values[0] != null && values[0].id != undefined && values[1] != null && values[1].id != undefined) {
                    $scope.loadSprints();
                }
            });
        };

        $scope.loadSprints = function() {
            BoardData.allSprints($scope.project.id)
                .success(function(sprints) {
                    $scope.sprints = sprints.result;
                    $scope.sprintId = sprints.result[0]._id;
                    $scope.openGraph(sprints.result[1]._id);
                });
        };

        $scope.openGraph = function (sprintId) {
            GraphData.getGraph(sprintId)
	            .success(function(graph) {
	            	$scope.chart = graph.result;
	            })
                .error(function() {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Burn down chart cannot yet be generated, sorry!')
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                });
        };

    });
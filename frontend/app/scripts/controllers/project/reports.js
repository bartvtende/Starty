'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:ReportsCtrl
 * @description
 * # ReportsCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
    .controller('ReportsCtrl', function ($scope, GraphData, BoardData) {

    	$scope.chart = {};


        $scope.$watch('$viewContentLoaded', function () {
            $scope.sprints = BoardData.allSprints($scope.project.id)
            .success(function(sprints) {
            	$scope.sprints = sprints.result
            	$scope.openGraph(sprints.result[0]._id);
            });
        });

        $scope.openGraph = function (sprintId) {
            GraphData.getGraph(sprintId)
	            .success(function(graph) {
	            	$scope.chart = graph;
	            });
        };

    });
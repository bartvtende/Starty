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

        $scope.showChart = false;
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
                    $scope.openGraph(sprints.result[0]._id);
                });
        };

        $scope.openGraph = function (sprintId) {
            GraphData.getGraph(sprintId)
	            .success(function(graph) {
                    $scope.showChart = true;
                    var graph = graph.result;
                    $scope.chartObject = {
                        "type": "LineChart",
                        "displayed": true,
                        "data": {
                            "cols": [
                                {
                                    "id": "days",
                                    "label": "Days",
                                    "type": "string",
                                    "p": {}
                                },
                                {
                                    "id": "ideal-id",
                                    "label": "Ideal line",
                                    "type": "number",
                                    "p": {}
                                },
                                {
                                    "id": "actual-id",
                                    "label": "Actual line",
                                    "type": "number",
                                    "p": {}
                                }
                            ],
                            "rows": []
                        },
                        "options": {
                            "title": "Burn down chart for sprint",
                            "isStacked": "true",
                            "fill": 20,
                            "displayExactValues": true,
                            "vAxis": {
                                "title": "Expected time",
                                "gridlines": {
                                    "count": 10
                                }
                            },
                            "hAxis": {
                                "title": "Days"
                            }
                        },
                        "formatters": {}
                    };

                    for (var id in graph.graphData) {
                        var data = graph.graphData[id];
                        $scope.chartObject.data.rows.push({
                            "c": [
                                {
                                    "v": data[0]
                                },
                                {
                                    "v": Math.round(data[1] * 10) / 10
                                },
                                {
                                    "v": Math.round(data[2] * 10) / 10
                                }
                            ]
                        });
                    };
	            })
                .error(function() {
                    $scope.showChart = false;
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Burn down chart cannot yet be generated, sorry!')
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                });
        };

    });
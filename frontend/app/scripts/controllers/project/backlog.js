'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:BacklogCtrl
 * @description
 * # BacklogCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
    .controller('BacklogCtrl', function ($state, $stateParams, $scope, BacklogData, ProjectData, $mdToast, $mdDialog) {

        $scope.statusses = ['Open', 'Accepted', 'Stalled', 'In review', 'Done'];

        $scope.backlogs = [];
        $scope.orderBy = '+id';

        $scope.toggleOrderBy = function (order) {
            if ($scope.orderBy == '+' + order) {
                $scope.orderBy = '-' + order;
            } else {
                $scope.orderBy = '+' + order;
            }
        };

        $scope.createBacklogItem = function (backlog) {
            backlog.project_id = $scope.project.id;
            BacklogData.createBacklogItem(backlog)
                .success(function () {
                    $state.go('project.backlog');
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Your backlog item has been created!')
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                })
                .error(function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Something went wrong, please try again please')
                            .position('bottom left')
                            .hideDelay(5000)
                    );
                });
        };

        $scope.$watch('$viewContentLoaded', function () {
            $scope.loadProject();
        });

        $scope.loadProject = function () {
            $scope.$watch('project', function () {
                if ($scope.project != null)
                    $scope.loadBacklog();
            });
        };

        $scope.loadBacklog = function () {
            if ($stateParams.id == undefined) {
                // Load all backlog items from one project
                BacklogData.allBacklogItems($scope.project.id)
                    .success(function (backlogs) {
                        $scope.backlogs = backlogs.result;
                    })
                    .error(function (err) {
                        $mdToast.show(
                            $mdToast.simple()
                                .content('Something went wrong, please try again please')
                                .position('bottom left')
                                .hideDelay(5000)
                        );
                        console.log(err);
                    });

            } else {
                // Load a backlog item from one project
                BacklogData.getBacklogItem($scope.project.id, $stateParams.id)
                    .success(function (backlog) {
                        $scope.backlog = backlog.result.item;
                    })
                    .error(function (err) {
                        $mdToast.show(
                            $mdToast.simple()
                                .content('Something went wrong, please try again please')
                                .position('bottom left')
                                .hideDelay(5000)
                        );
                        console.log(err);
                    });
            }
        };

        $scope.editBacklogItem = function (backlog) {
            if (typeof backlog === 'object') {
                backlog.project_id = $scope.project.id;
                BacklogData.setBacklogItem(backlog)
                    .success(function (project) {
                        $state.go('project.backlog');
                    })
                    .error(function () {
                        $mdToast.show(
                            $mdToast.simple()
                                .content('Something went wrong, please try again please')
                                .position('bottom left')
                                .hideDelay(5000)
                        );
                    });

            } else
                $state.go('project.backlog-set', {id: backlog});
        };

        $scope.confirmDelete = function (event, id) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .parent(angular.element(document.body))
                .title('Would you like to delete this item?')
                .content('The item you are about to delete is "' + id + '".')
                .ok('Ok')
                .cancel('Cancel')
                .targetEvent(event);
            $mdDialog.show(confirm).then(function () {
                BacklogData.deleteBacklogItem($scope.project.id, id)
                    .success(function (item) {
                        for (var key in $scope.backlogs) {
                            if ($scope.backlogs[key].id == item.result.id) {
                                $scope.backlogs.splice(key, 1);
                            }
                        }
                    });
            });
        };

    })

    .controller('BacklogDetailCtrl', function ($scope, $stateParams, $state, BacklogData, $mdToast) {
        $scope.backlogId = $stateParams.id;

        $scope.$watch('$viewContentLoaded', function () {
            $scope.loadProject();
        });

        $scope.loadProject = function () {
            $scope.$watch('project', function () {
                if ($scope.project != null)
                    $scope.loadBacklog();
            });
        };

        $scope.loadBacklog = function () {
            if ($scope.project.id != null && $scope.backlogId != null) {
                BacklogData.getBacklogItem($scope.project.id, $scope.backlogId)
                    .success(function (item) {
                        if (item.result == null || item.result == '') {
                            return $state.go('project.issues-detail', {id: $scope.backlogId});
                        }
                        $scope.backlog = item.result.item;
                        $scope.user = item.result.user;
                    })
                    .error(function () {
                        $mdToast.show(
                            $mdToast.simple()
                                .content('Something went wrong, please try again please')
                                .position('bottom left')
                                .hideDelay(5000)
                        );
                    })
            } else {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Something went wrong, please try again please')
                        .position('bottom left')
                        .hideDelay(5000)
                );
            }
        };
    });
'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:BacklogCtrl
 * @description
 * # BacklogCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
    .controller('IssuesCtrl', function ($state, $stateParams, $scope, IssuesData, ProjectData, $mdToast, $mdDialog) {

        $scope.priorities = ['Trivial', 'Minor', 'Major', 'Critical', 'Blocking'];
        $scope.types = ['Bug', 'New feature', 'Sub-task', 'Improvement'];
        $scope.issues = [];

        $scope.orderBy = '+id';

        $scope.toggleOrderBy = function (order) {
            if ($scope.orderBy == '+' + order) {
                $scope.orderBy = '-' + order;
            } else {
                $scope.orderBy = '+' + order;
            }
        };

        $scope.createIssue = function (backlog) {
            backlog.project_id = $scope.project.id;
            IssuesData.createIssue(backlog)
                .success(function () {
                    $state.go('project.issues');
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
                    $scope.loadIssues();
            });
        };

        $scope.loadIssues = function () {
            if ($stateParams.id == undefined) {
                // Load all backlog items from one project
                IssuesData.allIssues($scope.project.id)
                    .success(function (backlogs) {
                        $scope.issues = backlogs.result;
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
                IssuesData.getIssue($scope.project.id, $stateParams.id)
                    .success(function (backlog) {
                        $scope.issue = backlog.result.item;
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

        $scope.editIssue = function (backlog) {
            if (typeof backlog === 'object') {
                backlog.project_id = $scope.project.id;
                IssuesData.setIssue(backlog)
                    .success(function (project) {
                        $state.go('project.issues');
                        $scope.issue = project.result.issue;
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
                IssuesData.deleteIssue($scope.project.id, id)
                    .success(function (item) {
                        for (var key in $scope.issues) {
                            if ($scope.issues[key].id == item.result.id) {
                                $scope.issues.splice(key, 1);
                            }
                        }
                    });
            });
        };
    })

    .controller('IssuesDetailCtrl', function ($scope, $stateParams, IssuesData, $mdToast) {
        $scope.issueId = $stateParams.id;

        $scope.$watch('$viewContentLoaded', function () {
            $scope.loadProject();
        });

        $scope.loadProject = function () {
            $scope.$watch('project', function () {
                if ($scope.project != null)
                    $scope.loadIssue();
            });
        };

        $scope.loadIssue = function () {
            if ($scope.project.id != null && $scope.issueId != null) {
                IssuesData.getIssue($scope.project.id, $scope.issueId)
                    .success(function (issue) {
                        $scope.issue = issue.result.item;
                        $scope.user = issue.result.user;
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

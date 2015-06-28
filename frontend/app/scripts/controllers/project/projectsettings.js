'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
    .controller('ProjectSettingsCtrl', function ($scope, $auth, $mdDialog, ProjectData, $state, GitHubData) {

        $scope.authenticate = function (provider) {
            $auth.authenticate(provider);
        };

        $scope.$watch('$viewContentLoaded', function () {
            $scope.loadProject();
        });

        $scope.loadProject = function () {
            $scope.$watch('project', function () {
                if ($scope.project != null)
                    $scope.loadRepositories();
            });
        };

        $scope.loadRepositories = function() {
            GitHubData.getRepositories($scope.project.id)
                .success(function(repositories) {
                    $scope.repositories = repositories.result;
                    console.log(repositories);
                })
        };

        $scope.createWebhook = function (id) {
            var owner;
            for (var i = 0; i < $scope.repositories.length; i++) {
                if ($scope.repositories[i].name == id) {
                    owner = $scope.repositories[i].owner;
                }
            };
            GitHubData.createWebhook($scope.project.id, {owner: owner, repo: id})
                .success(function(result) {
                    console.log(result);
                    console.log('GitHub has now been linked to this project!');
                });
        }

        $scope.confirmDelete = function (event, project) {
            console.log(project);
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .parent(angular.element(document.body))
                .title('Would you like to delete this project?')
                .content('The project you are about to delete is "' + project.name + '".')
                .ok('Ok')
                .cancel('Cancel')
                .targetEvent(event);
            $mdDialog.show(confirm).then(function () {
                ProjectData.deleteProject(project.shortcode)
                    .success(function () {
                        $state.go('overview.overview');
                    });
            });
        };

    });

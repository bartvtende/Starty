'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
    .controller('ProjectCtrl', function ($state, $scope, OrganizationData, ProjectData, $mdToast, $mdDialog) {

        $scope.projects = [];
        $scope.showCreateProject = false;
        $scope.showInviteUser = false;


        $scope.$watch('$viewContentLoaded', function () {
            $scope.loadProjects();
        });

        $scope.loadProjects = function () {
            // Load all projects
            ProjectData.allProjects()
                .success(function (projects) {
                    $scope.projects = projects.result;
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
        };

        $scope.toggleProject = function () {
            $scope.showCreateProject = !$scope.showCreateProject;
            if ($scope.showInviteUser)
                $scope.showInviteUser = false;
        };

        $scope.toggleUser = function () {
            $scope.showInviteUser = !$scope.showInviteUser;
            if ($scope.showCreateProject)
                $scope.showCreateProject = false;
        };

        $scope.createProject = function (name, description) {
            var newProject = {
                name: name,
                description: description,
                shortcode: slug(name)
            };

            ProjectData.createProject(newProject)
                .success(function () {
                    $scope.loadProjects();

                    $scope.showCreateProject = false;
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

        $scope.inviteMember = function (email) {
            OrganizationData.inviteMember({email: email})
                .success(function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('The user has been invited into your organization!')
                            .position('bottom left')
                            .hideDelay(3000)
                    );

                    $scope.showInviteUser = false;
                })
                .error(function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Can\'t invite the email, it is either not registered or already in an organization!')
                            .position('bottom left')
                            .hideDelay(5000)
                    );
                });
        };

        $scope.goToProject = function (shortcode) {
            $state.go('project.messages', {projectName: shortcode});

            //var confirm = $mdDialog.confirm()
            //  .parent(angular.element(document.body))
            //  .title('Would you like to join this project?')
            //  .ok('Ok')
            //  .cancel('Cancel')
            //  .targetEvent(event);
            //$mdDialog.show(confirm).then(function() {
            //  ProjectData.joinProject({shortcode: shortcode})
            //  .success(function(item) {
            //      $mdToast.show(
            //        $mdToast.simple()
            //          .content('You just joined a project!')
            //          .position('bottom left')
            //          .hideDelay(3000)
            //      );
            //    $state.go('project.messages', {projectName: shortcode});
            //  });
            //});
        };

    });

/**
 * Method to convert the project title into a human readable url string
 *
 * @param str
 * @returns {string|*}
 */
var slug = function (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
};

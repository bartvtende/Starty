'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:BacklogCtrl
 * @description
 * # BacklogCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('BacklogCtrl', function ($scope, $rootScope, BacklogData, ProjectData, $mdToast) {

    $scope.backlogs = [
      { id: 'IS-13', name: 'Ability to login', user: 'Bart', time: '07-06-2015', status: 'Pending' },
      { id: 'RT-03', name: 'Send a real-time message', user: 'Jerke', time: '04-06-2015', status: 'Accepted' },
      { id: 'BI-29', name: 'Deleting a backlog item', user: 'Jan-Bert', time: '03-06-2015', status: 'Done' }
    ];

    $scope.createBacklogItem = function(backlog) {
      backlog.project_id = $rootScope.project.id;
      BacklogData.createBacklogItem(backlog)
        .success(function(project) {
            $state.go('project.backlog');
          })
        .error(function() {
            $mdToast.show(
                $mdToast.simple()
                    .content('Something went wrong, please try again please')
                    .position('bottom left')
                    .hideDelay(5000)
            );
          });
    };

    $scope.projects = [];
    $scope.showCreateProject = false;
    $scope.showInviteUser = false;


    $scope.$watch('$viewContentLoaded', function() {
      $scope.loadBacklog();
    });

    $scope.loadBacklog = function() {
        // Load all projects
        BacklogData.allBacklogItems()
            .success(function(backlogs) {
                $scope.backlogs = backlogs.result;
            })
            .error(function(err) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Something went wrong, please try again please')
                        .position('bottom left')
                        .hideDelay(5000)
                );
                console.log(err);
            });
    };

    // $scope.toggleProject = function() {
    //     $scope.showCreateProject = !$scope.showCreateProject;
    //     if ($scope.showInviteUser)
    //         $scope.showInviteUser = false;
    // };

    // $scope.toggleUser = function() {
    //     $scope.showInviteUser = !$scope.showInviteUser;
    //     if ($scope.showCreateProject)
    //         $scope.showCreateProject = false;
    // };

    // $scope.createProject = function(project) {
    //     project.shortcode = slug(project.name);
    //     ProjectData.createProject(project)
    //         .success(function(project) {
    //             $scope.loadProjects();

    //             $scope.project.name = '';
    //             $scope.project.description = '';
    //         })
    //         .error(function() {
    //             $mdToast.show(
    //                 $mdToast.simple()
    //                     .content('Something went wrong, please try again please')
    //                     .position('bottom left')
    //                     .hideDelay(5000)
    //             );
    //         });
    // };

    // $scope.inviteMember = function(email) {
    //   OrganizationData.inviteMember({email: email})
    //     .success(function () {
    //       $mdToast.show(
    //         $mdToast.simple()
    //           .content('The user has been invited into your organization!')
    //           .position('bottom left')
    //           .hideDelay(3000)
    //       );
    //       $scope.email = '';
    //     })
    //     .error(function () {
    //       $mdToast.show(
    //         $mdToast.simple()
    //           .content('Can\'t invite the email, it is either not registered or already in an organization!')
    //           .position('bottom left')
    //           .hideDelay(5000)
    //       );
    //     });
    // };

  });

/**
 * Method to convert the project title into a human readable url string
 *
 * @param str
 * @returns {string|*}
 */
var slug = function(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
};

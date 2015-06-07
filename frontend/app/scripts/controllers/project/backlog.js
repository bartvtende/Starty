'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:BacklogCtrl
 * @description
 * # BacklogCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('BacklogCtrl', function ($scope) {

      $scope.backlogs = [
        { id: 'IS-13', name: 'Ability to login', user: 'Bart', time: '07-06-2015', status: 'Pending' },
        { id: 'RT-03', name: 'Send a real-time message', user: 'Jerke', time: '04-06-2015', status: 'Accepted' },
        { id: 'BI-29', name: 'Deleting a backlog item', user: 'Jan-Bert', time: '03-06-2015', status: 'Done' }
      ];

      $scope.createBacklog = function(backlog) {
        console.log(backlog);
      };

  });

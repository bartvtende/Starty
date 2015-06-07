'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:IssuesCtrl
 * @description
 * # IssuesCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('IssuesCtrl', function ($scope) {

      $scope.issues = [
          { id: 'IS-13', name: 'Bug in logging out', user: 'Bart', time: '07-06-2015', status: 'Pending' },
          { id: 'IS-13', name: 'XSS vulnerability in login form', user: 'Henderikus', time: '03-06-2015', status: 'Accepted' },
          { id: 'IS-13', name: 'Bug in logging out', user: 'Bart', time: '07-06-2015', status: 'Completed' },
      ];

      $scope.createIssue = function(issue) {
        console.log(issue);
      };

  });

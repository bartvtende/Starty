'use strict';

/**
 * @ngdoc overview
 * @name startyApp
 * @description
 * # startyApp
 *
 * Main module of the application.
 */
angular
  .module('startyApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngMdIcons'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'ProjectCtrl'
      })
      .state('messages', {
        url: '/messages',
        templateUrl: 'views/message.html',
        controller: 'MessageCtrl'
      })
      .state('board', {
        url: '/board',
        templateUrl: 'views/board.html',
        controller: 'BoardCtrl'
      })
      .state('backlog', {
        url: '/backlog',
        templateUrl: 'views/backlog.html',
        controller: 'BacklogCtrl'
      })
      .state('issues', {
        url: '/issues',
        templateUrl: 'views/issues.html',
        controller: 'IssuesCtrl'
      })
      .state('reports', {
        url: '/reports',
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl'
      })
      .state('git', {
        url: '/git',
        templateUrl: 'views/git.html',
        controller: 'GitCtrl'
      })
      .state('deployment', {
        url: '/deployment',
        templateUrl: 'views/deployment.html',
        controller: 'DeploymentCtrl'
      })
      .state('calendar', {
        url: '/calendar',
        templateUrl: 'views/calendar.html',
        controller: 'CalendarCtrl'
      });

      $urlRouterProvider.otherwise('/');
  });

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
    'ngMdIcons',
    'satellizer'
  ])
  .constant('urls', {
    API: 'http://localhost:1337/api'
  })
  .config(function($authProvider, urls) {
    $authProvider.baseUrl = urls.API;
    $authProvider.loginRedirect = '/';
    $authProvider.logoutRedirect = '/login';
    $authProvider.signupRedirect = '/';
    $authProvider.loginUrl = '/users/login';
    $authProvider.signupUrl = '/users/register';
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth', {
        templateUrl: 'views/layouts/auth.html'
      })
      .state('auth.login', {
        url: '/login',
        templateUrl: 'views/pages/auth/login.html',
        controller: 'LoginCtrl'
      })
      .state('auth.register', {
        url: '/register',
        templateUrl: 'views/pages/auth/register.html',
        controller: 'RegisterCtrl'
      })
      .state('auth.join-organization', {
        url: '/join',
        templateUrl: 'views/pages/auth/join-organization.html',
        controller: 'JoinCtrl'
      })
      .state('auth.forgot-password', {
        url: '/forgot-password',
        templateUrl: 'views/pages/auth/forgot-password.html',
        controller: 'ForgotPasswordCtrl'
      })
      .state('overview', {
        templateUrl: 'views/layouts/overview.html'
      })
      .state('overview.overview', {
        url: '/',
        templateUrl: 'views/pages/project/overview.html',
        controller: 'ProjectCtrl'
      })
      .state('project', {
        url: '/:projectName',
        templateUrl: 'views/layouts/project.html'
      })
      .state('project.messages', {
        url: '/',
        templateUrl: 'views/pages/project/message.html',
        controller: 'MessageCtrl'
      })
      .state('project.board', {
        url: '/board',
        templateUrl: 'views/pages/project/board.html',
        controller: 'BoardCtrl'
      })
      .state('project.backlog', {
        url: '/backlog',
        templateUrl: 'views/pages/project/backlog.html',
        controller: 'BacklogCtrl'
      })
      .state('project.backlog-create', {
        url: '/backlog/new',
        templateUrl: 'views/pages/project/backlog-create.html',
        controller: 'BacklogCtrl'
      })
      .state('project.issues', {
        url: '/issues',
        templateUrl: 'views/pages/project/issues.html',
        controller: 'IssuesCtrl'
      })
      .state('project.issues-create', {
        url: '/issues/new',
        templateUrl: 'views/pages/project/issues-create.html',
        controller: 'IssuesCtrl'
      })
      .state('project.reports', {
        url: '/reports',
        templateUrl: 'views/pages/project/reports.html',
        controller: 'ReportsCtrl'
      })
      .state('project.git', {
        url: '/git',
        templateUrl: 'views/pages/project/git.html',
        controller: 'GitCtrl'
      })
      .state('project.deployment', {
        url: '/deployment',
        templateUrl: 'views/pages/project/deployment.html',
        controller: 'DeploymentCtrl'
      })
      .state('project.calendar', {
        url: '/calendar',
        templateUrl: 'views/pages/project/calendar.html',
        controller: 'CalendarCtrl'
      });

      $urlRouterProvider.otherwise('/login');
  });

'use strict';

/**
 * @ngdoc service
 * @name startyApp.Board
 * @description
 * # Board
 * Service in the startyApp.
 */
angular.module('startyApp')
    .service('GitHubData', function ($http, urls) {

        this.authenticateGithub = function (github) {
            return $http.post(urls.API + '/providers/github', github);
        };

        this.getRepositories = function (projectId) {
            return $http.get(urls.API + '/github/' + projectId + '/repositories');
        };

        this.createWebhook = function (projectId, body) {
            return $http.post(urls.API + '/github/' + projectId + '/webhook', body);
        }

    });

'use strict';

/**
 * @ngdoc service
 * @name startyApp.Board
 * @description
 * # Board
 * Service in the startyApp.
 */
angular.module('startyApp')
    .service('ProviderData', function ($http, urls) {

        this.authenticateGithub = function (github) {
            return $http.post(urls.API + '/providers/github', github);
        };

    });

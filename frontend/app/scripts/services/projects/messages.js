'use strict';

/**
 * @ngdoc service
 * @name startyApp.Project
 * @description
 * # Project
 * Service in the startyApp.
 */
angular.module('startyApp')
    .service('MessageData', function ($http, urls) {

        this.getUsers = function () {
            return $http.get(urls.API + '/users/all');
        };

        this.getGlobal = function (projectId) {
            return $http.get(urls.API + '/messages/' + projectId);
        };

        this.getPerson = function (projectId, personId) {
            return $http.get(urls.API + '/messages/' + projectId + '/' + personId);
        };

    });
